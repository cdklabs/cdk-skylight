/**
 *  Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

// Imports
import { aws_ec2, aws_eks, aws_iam, aws_ssm } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IAdAuthenticationParameters } from "../../skylight-authentication";

export interface WindowsEKSClusterProps {
	/**
	 * The SSM namespace to save parameters to
	 * @default - 'cdk-skylight'.
	 */
	namespace?: string;

	vpc: aws_ec2.IVpc;

	/**
	 * The Managed AD Parameter store to use
	 * @default - 'No default'.
	 */
	mad_ssm_parameters: IAdAuthenticationParameters;
}

export class WindowsEKSCluster extends Construct {
	readonly eksCluster: aws_eks.Cluster;
	constructor(scope: Construct, id: string, props: WindowsEKSClusterProps) {
		super(scope, id);
		props.namespace = props.namespace ?? "cdk-skylight";

		const eks_role = new aws_iam.Role(this, "eks-instance-role", {
			assumedBy: new aws_iam.ServicePrincipal("ec2.amazonaws.com"),
			roleName: "eks-node-role" + id,
			managedPolicies: [
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonSSMManagedInstanceCore"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonEKSWorkerNodePolicy"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonEC2ContainerRegistryReadOnly"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKS_CNI_Policy"),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonSSMDirectoryServiceAccess"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AWSKeyManagementServicePowerUser"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonEKSClusterPolicy"
				),
				aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"AmazonEKSVPCResourceController"
				),
			],
		});

		this.eksCluster = new aws_eks.Cluster(this, "WindowsEKSCluster", {
			version: aws_eks.KubernetesVersion.V1_21,
			vpc: props.vpc,
		});

		this.eksCluster.awsAuth.addRoleMapping(eks_role, {
			groups: ["system:bootstrappers", "system:nodes"],
			username: "system:node:{{EC2PrivateDNSName}}",
		});

		// https://docs.aws.amazon.com/eks/latest/userguide/windows-support.html#enable-windows-support
		const yaml_file = {
			apiVersion: "v1",
			kind: "ConfigMap",
			metadata: {
				name: "amazon-vpc-cni",
				namespace: "kube-system",
			},
			data: {
				"enable-windows-ipam": "true",
			},
		};
		this.eksCluster.addManifest("WindowsSupport", yaml_file);

		new aws_ssm.StringParameter(this, "secretName", {
			parameterName: `/${props.mad_ssm_parameters.namespace}/${props.mad_ssm_parameters.secretName}`,
			stringValue: this.eksCluster.clusterName,
		});
	}
}

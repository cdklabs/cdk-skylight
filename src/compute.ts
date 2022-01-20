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
import { Construct } from "constructs";
import { aws_ec2 as ec2, aws_eks, aws_iam } from "aws-cdk-lib";

const yaml = require("js-yaml");
const fs = require("fs");

/**
 * The properties for the Compute class.
 */
export interface IComputeProps {
	vpc: ec2.IVpc;
}
export class Compute extends Construct {
	readonly vpc: ec2.IVpc;
	readonly ekscluster: aws_eks.Cluster;

	constructor(scope: Construct, id: string, props: IComputeProps) {
		super(scope, id);
		this.vpc = props.vpc;

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

		this.ekscluster = new aws_eks.Cluster(this, "WindowsEKSCluster", {
			version: aws_eks.KubernetesVersion.V1_21,
			vpc: this.vpc,
		});

		this.ekscluster.awsAuth.addRoleMapping(eks_role, {
			groups: ["system:bootstrappers", "system:nodes"],
			username: "system:node:{{EC2PrivateDNSName}}",
		});

		this.ekscluster.addManifest(
			"WindowsSupport",
			yaml.load(fs.readFileSync("./src/windows-support.yaml", "utf8"))
		);
	}
}

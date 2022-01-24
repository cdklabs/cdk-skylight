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
import { aws_ec2 as ec2, aws_ssm, aws_efs, aws_fsx } from "aws-cdk-lib";

/**
 * The properties for the PersistentStorage class.
 */
export interface IPersistentStorageProps {
	/**
	 * The Filesystem size in GB
	 *
	 * @default - 200.
	 */
	fsxSize?: number;
	/**
	 * The Filesystem throughput in MBps
	 *
	 * @default - 128.
	 */
	fsxMbps?: number;
	/**
	 * Choosing Single-AZ or Multi-AZ file system deployment
	 * See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html
	 * @default - true.
	 */
	multiAZ?: boolean;
	/**
	 * Deploy the Amazon FSx file system in private subnet or public subnet
	 * See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html
	 * @default - true.
	 */
	fsxInPrivateSubnet?: boolean;
	/**
	 * The VPC to use, must have private subnets.
	 */
	vpc: ec2.IVpc;
}

export interface PersistentStorage {
	storageObject: aws_fsx.CfnFileSystem | aws_efs.FileSystem;
	vpc: ec2.IVpc;
}

export class FSxWindows extends Construct implements PersistentStorage {
	readonly storageObject: aws_fsx.CfnFileSystem;
	readonly vpc: ec2.IVpc;
	constructor(
		scope: Construct,
		id: string,
		namespace: string,
		props: IPersistentStorageProps
	) {
		super(scope, id);
		props.fsxInPrivateSubnet = props.fsxInPrivateSubnet ?? true;
		props.fsxMbps = props.fsxMbps ?? 128;
		props.fsxSize = props.fsxSize ?? 200;
		props.multiAZ = props.multiAZ ?? true;

		this.vpc = props.vpc;

		const ad = aws_ssm.StringParameter.valueForStringParameter(
			this,
			`${namespace}/ad`
		);

		const subnets = this.vpc.selectSubnets({
			subnetType: props.fsxInPrivateSubnet
				? ec2.SubnetType.PRIVATE_WITH_NAT
				: ec2.SubnetType.PUBLIC,
		}).subnetIds;

		const windows_configuration: aws_fsx.CfnFileSystem.WindowsConfigurationProperty =
			{
				throughputCapacity: props.fsxMbps,
				activeDirectoryId: ad,
				deploymentType: props.multiAZ ? "MULTI_AZ_1" : "SINGLE_AZ_2",
				preferredSubnetId: props.multiAZ ? subnets[0] : undefined,
			};

		const sg = new ec2.SecurityGroup(this, id + "-FSxSG", {
			vpc: this.vpc,
		});

		// Allow access from inside the VPC
		sg.addIngressRule(ec2.Peer.ipv4(this.vpc.vpcCidrBlock), ec2.Port.allTcp());

		const fsx_props: aws_fsx.CfnFileSystemProps = {
			fileSystemType: "WINDOWS",
			subnetIds: props.multiAZ ? [subnets[0], subnets[1]] : [subnets[0]],
			windowsConfiguration: windows_configuration,
			storageCapacity: props.fsxSize,
			securityGroupIds: [sg.securityGroupId],
		};

		this.storageObject = new aws_fsx.CfnFileSystem(
			this,
			(id = id + "-FSxObject"),
			fsx_props
		);

		new aws_ssm.StringParameter(this, "fsxEndpoint", {
			parameterName: `/${namespace}/fsxEndpoint`,
			stringValue: this.storageObject.getAtt("DNSName").toString(),
		});
	}
}

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
import { aws_fsx as fsx, aws_ec2 as ec2 } from "aws-cdk-lib";
import { MadR53, MadR53Props } from "./mad-r53";

/**
 * The properties for the WindowsFSxMad class.
 */
export interface WindowsFSxMadProps extends MadR53Props {
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
}

export class WindowsFSxMad extends MadR53 {
	readonly fsx: fsx.CfnFileSystem;
	constructor(scope: Construct, id: string, props: WindowsFSxMadProps) {
		super(scope, id, props);
		props.fsxInPrivateSubnet = props.fsxInPrivateSubnet ?? true;
		props.fsxMbps = props.fsxMbps ?? 128;
		props.fsxSize = props.fsxSize ?? 200;
		props.multiAZ = props.multiAZ ?? true;

		const subnets = this.vpc.selectSubnets({
			subnetType: props.fsxInPrivateSubnet
				? ec2.SubnetType.PRIVATE_WITH_NAT
				: ec2.SubnetType.PUBLIC,
		}).subnetIds;

		const windows_configuration: fsx.CfnFileSystem.WindowsConfigurationProperty =
			{
				throughputCapacity: props.fsxMbps,
				activeDirectoryId: this.ad.ref,
				deploymentType: props.multiAZ ? "MULTI_AZ_1" : "SINGLE_AZ_2",
				preferredSubnetId: props.multiAZ ? subnets[0] : undefined,
			};

		const sg = new ec2.SecurityGroup(this, id + "-FSxSG", {
			vpc: this.vpc,
		});

		// Allow access from inside the VPC
		sg.addIngressRule(ec2.Peer.ipv4(this.vpc.vpcCidrBlock), ec2.Port.allTcp());

		const fsx_props: fsx.CfnFileSystemProps = {
			fileSystemType: "WINDOWS",
			subnetIds: props.multiAZ ? [subnets[0], subnets[1]] : [subnets[0]],
			windowsConfiguration: windows_configuration,
			storageCapacity: props.fsxSize,
			securityGroupIds: [sg.securityGroupId],
		};

		this.fsx = new fsx.CfnFileSystem(this, (id = id + "-FSxObject"), fsx_props);
	}
}

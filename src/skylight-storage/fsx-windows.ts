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
import { aws_ec2 as ec2, aws_ssm, aws_fsx } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * The properties for the PersistentStorage class.
 */
export interface IFSxWindowsProps {
  /**
	 * The Filesystem size in GB
	 *
	 * @default - 200.
	 */
  fileSystemSize?: number;
  /**
	 * The Filesystem throughput in MBps
	 *
	 * @default - 128.
	 */
  throughputMbps?: number;
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
  fileSystemInPrivateSubnet?: boolean;
  /**
	 * The VPC to use, must have private subnets.
	 */
  vpc: ec2.IVpc;
}

export class FSxWindows extends Construct {
  readonly storageObject: aws_fsx.CfnFileSystem;
  readonly props: IFSxWindowsProps;
  constructor(
    scope: Construct,
    id: string,
    namespace: string,
    props: IFSxWindowsProps,
  ) {
    super(scope, id);
    this.props = props;
    this.props.fileSystemInPrivateSubnet =
			props.fileSystemInPrivateSubnet ?? true;
    this.props.throughputMbps = props.throughputMbps ?? 128;
    this.props.fileSystemSize = props.fileSystemSize ?? 200;
    this.props.multiAZ = props.multiAZ ?? true;

    const ad = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `${namespace}/ad`,
    );

    const subnets = this.props.vpc.selectSubnets({
      subnetType: props.fileSystemInPrivateSubnet
        ? ec2.SubnetType.PRIVATE_WITH_NAT
        : ec2.SubnetType.PUBLIC,
    }).subnetIds;

    const windows_configuration: aws_fsx.CfnFileSystem.WindowsConfigurationProperty =
			{
			  throughputCapacity: this.props.throughputMbps,
			  activeDirectoryId: ad,
			  deploymentType: props.multiAZ ? 'MULTI_AZ_1' : 'SINGLE_AZ_2',
			  preferredSubnetId: props.multiAZ ? subnets[0] : undefined,
			};

    const sg = new ec2.SecurityGroup(this, id + '-FSxSG', {
      vpc: this.props.vpc,
    });

    // Allow access from inside the VPC
    sg.addIngressRule(
      ec2.Peer.ipv4(this.props.vpc.vpcCidrBlock),
      ec2.Port.allTcp(),
    );

    const fsx_props: aws_fsx.CfnFileSystemProps = {
      fileSystemType: 'WINDOWS',
      subnetIds: this.props.multiAZ ? [subnets[0], subnets[1]] : [subnets[0]],
      windowsConfiguration: windows_configuration,
      storageCapacity: props.fileSystemSize,
      securityGroupIds: [sg.securityGroupId],
    };

    this.storageObject = new aws_fsx.CfnFileSystem(
      this,
      (id = id + '-FSxObject'),
      fsx_props,
    );

    new aws_ssm.StringParameter(this, 'fsxEndpoint', {
      parameterName: `/${namespace}/fsxEndpoint`,
      stringValue: this.smbMountAddress(),
    });
  }
  smbMountAddress(): string {
    return this.storageObject.getAtt('DNSName').toString();
  }
}

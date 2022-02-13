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
  activeDirectoryId: string;

  vpc: ec2.IVpc;

  ssmParameters?: IFSxWindowsParameters;
}

export interface IFSxWindowsParameters {
  /**
	 * The name of the parameter to save the FSxEndpoint DNS Endpoint
	 * @default - 'FSxEndpoint-DNS'.
	 */
  dnsEndpoint?: string;

  /**
	 * The SSM namespace to read/write parameters to
	 * @default - 'cdk-skylight'.
	 */
  namespace?: string;
}

export class FSxWindows extends Construct {
  readonly ssmParameters: IFSxWindowsParameters;
  readonly fsxObject: aws_fsx.CfnFileSystem;
  constructor(scope: Construct, id: string, props: IFSxWindowsProps) {
    super(scope, id);
    props = props;
    props.fileSystemInPrivateSubnet = props.fileSystemInPrivateSubnet ?? true;
    props.throughputMbps = props.throughputMbps ?? 128;
    props.fileSystemSize = props.fileSystemSize ?? 200;
    props.multiAZ = props.multiAZ ?? true;
    this.ssmParameters = props.ssmParameters ?? {};
    this.ssmParameters.dnsEndpoint =
			this.ssmParameters?.dnsEndpoint ?? 'FSxEndpoint-DNS';

    if (this.ssmParameters.namespace) {
      this.ssmParameters.namespace = `${this.ssmParameters.namespace}/storage/fsx`;
    } else {
      this.ssmParameters.namespace = 'cdk-skylight/storage/fsx';
    }

    const subnets = props.vpc.selectSubnets({
      subnetType: props.fileSystemInPrivateSubnet
        ? ec2.SubnetType.PRIVATE_WITH_NAT
        : ec2.SubnetType.PUBLIC,
    }).subnetIds;

    const windows_configuration: aws_fsx.CfnFileSystem.WindowsConfigurationProperty =
			{
			  throughputCapacity: props.throughputMbps,
			  activeDirectoryId: props.activeDirectoryId,
			  deploymentType: props.multiAZ ? 'MULTI_AZ_1' : 'SINGLE_AZ_2',
			  preferredSubnetId: props.multiAZ ? subnets[0] : undefined,
			};

    const sg = new ec2.SecurityGroup(this, id + '-FSxSG', {
      vpc: props.vpc,
    });

    // Allow access from inside the VPC
    sg.addIngressRule(ec2.Peer.ipv4(props.vpc.vpcCidrBlock), ec2.Port.allTcp());

    const fsx_props: aws_fsx.CfnFileSystemProps = {
      fileSystemType: 'WINDOWS',
      subnetIds: props.multiAZ ? [subnets[0], subnets[1]] : [subnets[0]],
      windowsConfiguration: windows_configuration,
      storageCapacity: props.fileSystemSize,
      securityGroupIds: [sg.securityGroupId],
    };

    this.fsxObject = new aws_fsx.CfnFileSystem(
      this,
      (id = id + '-FSxObject'),
      fsx_props,
    );

    new aws_ssm.StringParameter(this, 'ssm-dns-fsxEndpoint', {
      parameterName: `/${this.ssmParameters.namespace}/${this.ssmParameters.dnsEndpoint}`,
      stringValue: this.fsxObject.getAtt('DNSName').toString(),
    });
  }
  smbMountAddress(): string {
    const fsxName = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `/${this.ssmParameters.namespace}/${this.ssmParameters.dnsEndpoint}`,
    );

    return fsxName;
  }
}

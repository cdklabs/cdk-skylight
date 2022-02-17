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
import { aws_ec2 as ec2, aws_ssm, aws_fsx, aws_iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IAdAuthenticationParameters } from '../skylight-authentication';
import { DomainWindowsNode } from '../skylight-compute/index';

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

  adParametersStore: IAdAuthenticationParameters;

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
  readonly props: IFSxWindowsProps;
  readonly worker: DomainWindowsNode;
  constructor(scope: Construct, id: string, props: IFSxWindowsProps) {
    super(scope, id);
    this.props = props;
    this.props.fileSystemInPrivateSubnet =
			props.fileSystemInPrivateSubnet ?? true;
    this.props.throughputMbps = props.throughputMbps ?? 128;
    this.props.fileSystemSize = props.fileSystemSize ?? 200;
    this.props.multiAZ = props.multiAZ ?? true;
    this.ssmParameters = props.ssmParameters ?? {};
    this.ssmParameters.dnsEndpoint =
			this.ssmParameters?.dnsEndpoint ?? 'FSxEndpoint-DNS';

    if (this.ssmParameters.namespace) {
      this.ssmParameters.namespace = `${this.ssmParameters.namespace}/storage/fsx`;
    } else {
      this.ssmParameters.namespace = 'cdk-skylight/storage/fsx';
    }

    const subnets = this.props.vpc.selectSubnets({
      subnetType: props.fileSystemInPrivateSubnet
        ? ec2.SubnetType.PRIVATE_WITH_NAT
        : ec2.SubnetType.PUBLIC,
    }).subnetIds;

    const directoryID = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `/${props.adParametersStore.namespace}/${props.adParametersStore.directoryIDPointer}`,
    );

    const windows_configuration: aws_fsx.CfnFileSystem.WindowsConfigurationProperty =
			{
			  throughputCapacity: this.props.throughputMbps,
			  activeDirectoryId: directoryID,
			  deploymentType: this.props.multiAZ ? 'MULTI_AZ_1' : 'SINGLE_AZ_2',
			  preferredSubnetId: this.props.multiAZ ? subnets[0] : undefined,
			};

    const sg = new ec2.SecurityGroup(this, id + '-FSxSG', {
      vpc: this.props.vpc,
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
    this.worker = this.createWorker(props.adParametersStore);

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

  createWorker(
    adParametersStore: IAdAuthenticationParameters,
  ): DomainWindowsNode {
    return new DomainWindowsNode(this, 'worker', {
      madSsmParameters: adParametersStore,
      vpc: this.props.vpc,
      instanceType: 't3.xlarge',
      iamManagedPoliciesList: [
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonSSMManagedInstanceCore',
        ),
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
          'SecretsManagerReadWrite',
        ),
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonFSxReadOnlyAccess',
        ),
      ],
    });
  }

  createFolder(folderName: string) {
    const secretName = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `/${this.props.adParametersStore.namespace}/${this.props.adParametersStore.secretPointer}`,
    );
    this.worker.runPSwithDomainAdmin(
      [
        `$FSX = '${this.fsxObject
          .getAtt('DNSName')
          .toString()}' ## Amazon FSx DNS Name`,
        '$FSxPS = (Get-FSXFileSystem | ? {$_.DNSName -contains $FSX}).WindowsConfiguration.RemoteAdministrationEndpoint',
        `$FolderName = '${folderName}'`,
        `[string]$SecretAD  = '${secretName}'`,
        '$SecretObj = Get-SECSecretValue -SecretId $SecretAD',
        '[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)',
        '$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force',
        " $username   = $Secret.Domain + '\\' + $Secret.UserID ",
        '$domain_admin_credential = New-Object System.Management.Automation.PSCredential($username,$password)',
        '# Create the folder (the shared driver to the hosts)',
        'New-Item -ItemType Directory -Name $FolderName -Path \\\\$FSX\\D$\\',
        '# Set NTFS Permissions',
        '# ACL',
        '$ACL = Get-Acl \\\\$FSx\\D$\\$FolderName',
        '$permission = "NT AUTHORITY\\Authenticated Users","FullControl","Allow"',
        '$Ar = New-Object System.Security.AccessControl.FileSystemAccessRule $permission',
        '$ACL.SetAccessRule($Ar)',
        'Set-Acl \\\\$FSX\\D$\\$FolderName $ACL',
        '# Create the Share and set the share permissions',
        '$Session = New-PSSession -ComputerName $FSxPS -ConfigurationName FsxRemoteAdmin',
        'Import-PsSession $Session',
        'New-FSxSmbShare -Name $FolderName -Path "D:\\$FolderName" -Description "Shared folder with gMSA access" -Credential $domain_admin_credential -FolderEnumerationMode AccessBased',
        '$accessList="NT AUTHORITY\\Authenticated Users"',
        'Grant-FSxSmbShareaccess -Name $FolderName -AccountName $accessList -accessRight Full -Confirm:$false',
        'Disconnect-PSSession -Session $Session',
      ],
      'createFolder',
    );
  }
}

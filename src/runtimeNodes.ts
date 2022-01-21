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

import {
	aws_autoscaling,
	aws_ec2,
	aws_iam,
	aws_ssm,
	CfnResource,
} from "aws-cdk-lib";
import { AutoScalingGroup } from "aws-cdk-lib/aws-autoscaling";
import { Construct } from "constructs";

export class runtimeNodes extends Construct {
	constructor(scope: Construct, id: string) {
		super(scope, id);
	}
}

// Example of Kubernetes implementation of it

export class KubeWindowsASG extends runtimeNodes {
	readonly asg: AutoScalingGroup;
	readonly windows_workers_role: aws_iam.Role;
	readonly asg_resource: aws_autoscaling.CfnAutoScalingGroup;

	constructor(
		scope: Construct,
		id: string,
		vpc: aws_ec2.Vpc,
		nameSpace: string
	) {
		super(scope, id);
		const windows_machineImage = new aws_ec2.LookupMachineImage({
			name: "*Windows_Server-2019-English-Full-EKS_Optimized-1.21*",
			windows: true,
		});

		const eks_security_group = new aws_ec2.SecurityGroup(
			this,
			id + "-securityGroup",
			{
				vpc: vpc,
			}
		);
		this.windows_workers_role = new aws_iam.Role(
			this,
			"windows-eks-workers-instance-role",
			{
				assumedBy: new aws_iam.ServicePrincipal("ec2.amazonaws.com"),
				roleName: "windows-eks-workers-instance-role",
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
					aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
						"AmazonEKS_CNI_Policy"
					),
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
						"SecretsManagerReadWrite"
					),
				],
			}
		);

		this.asg = new aws_autoscaling.AutoScalingGroup(
			this,
			"WindowsInstancesCapacity",
			{
				vpc: vpc,
				role: this.windows_workers_role,
				minCapacity: 2,
				securityGroup: eks_security_group,
				maxCapacity: 10,
				instanceType: new aws_ec2.InstanceType("m5.xlarge"),
				machineImage: windows_machineImage,
			}
		);

		this.asg_resource = this.asg.node.children.find(
			(c) =>
				(c as CfnResource).cfnResourceType ===
				"AWS::AutoScaling::AutoScalingGroup"
		) as aws_autoscaling.CfnAutoScalingGroup;

		this.asg.addUserData(`
		
			#domain join with secret from secret manager
			[string]$SecretAD  = "${aws_ssm.StringParameter.valueForStringParameter(
				this,
				`${nameSpace}/authentication`
			)}"
			$SecretObj = Get-SECSecretValue -SecretId $SecretAD
			[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)
			$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force
			$username   = $Secret.UserID + "@" + $Secret.Domain
			$credential = New-Object System.Management.Automation.PSCredential($username,$password)
			Add-Computer -DomainName $Secret.Domain -Credential $credential
		
			Restart-Computer -Force
			`);

		const secretName = aws_ssm.StringParameter.valueForStringParameter(
			this,
			`${nameSpace}/authentication`
		);

		new aws_ssm.CfnAssociation(this, "SMBGlobalMappingAndEKSJoin", {
			name: "AWS-RunPowerShellScript",
			parameters: {
				commands: [
					"$bootfix = {",
					"$LocalDrive = Get-SmbGlobalMapping",
					"if ($LocalDrive -eq $null)",
					"{",
					` [string]$SecretAD  = '${secretName}'`,
					" $SecretObj = Get-SECSecretValue -SecretId $SecretAD",
					" [PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)",
					" $password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force",
					" $username   = $Secret.UserID + '@' + $Secret.Domain",
					" $domain_admin_credential = New-Object System.Management.Automation.PSCredential($username,$password)",
					` New-SmbGlobalMapping -RemotePath '\\\\${aws_ssm.StringParameter.valueForStringParameter(
						this,
						`${nameSpace}/fsxEndpoint`
					)}\\ContainerStorage' -Credential $domain_admin_credential -LocalPath G: -Persistent $true -RequirePrivacy $true -ErrorAction Stop`,
					"}",
					"}",
					"New-Item -ItemType Directory -Path c:\\Scripts",
					"$bootfix | set-content c:\\Scripts\\bootfix.ps1",
					"# Create a scheduled task on startup to execute the mapping",
					"$action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument 'c:\\scripts\\bootfix.ps1'",
					"$trigger =  New-ScheduledTaskTrigger -AtStartup",
					"Register-ScheduledTask -Action $action -Trigger $trigger -TaskName 'SmbGlobalMapping' -Description 'Mapping the SMB share and adding machine to gMSA' -RunLevel Highest -User $username -Password $Secret.Password",
					"# Running the boot fix once",
					"& $bootfix",
					"# Joining EKS Cluster",
					"[string]$EKSBootstrapScriptFile = 'C:\\Program Files\\Amazon\\EKS\\Start-EKSBootstrap.ps1'",
					`powershell -File $EKSBootstrapScriptFile -EKSClusterName '${aws_ssm.StringParameter.valueForStringParameter(
						this,
						`${nameSpace}/eksClusterName`
					)}'`,
					"",
				],
			},
			targets: [
				{
					key: "tag:aws:autoscaling:groupName",
					values: [this.asg.autoScalingGroupName],
				},
			],
		});

		new aws_ssm.CfnAssociation(this, "gMSASpecFile", {
			name: "AWS-RunPowerShellScript",
			parameters: {
				commands: [
					"# Getting AD Password",
					`[string]$SecretAD  = '${secretName}'`,
					"$SecretObj = Get-SECSecretValue -SecretId $SecretAD",
					"[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)",
					"$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force",
					"$username   = $Secret.UserID + '@' + $Secret.Domain",
					"$domain_admin_credential = New-Object System.Management.Automation.PSCredential($username,$password)",
					"Add-WindowsFeature RSAT-AD-PowerShell",
					"Install-PackageProvider NuGet -Force",
					"Install-Module CredentialSpec -Force",
					"Set-PSRepository PSGallery -InstallationPolicy Trusted",
					"Add-ADGroupMember -Identity 'WebApp01Hosts' -Members $env:computername$ -Credential $domain_admin_credential",
					"# Saves the cred file to C:\\ProgramData\\Docker\\CredentialSpecs (default)",
					"$bootfix = {",
					"New-CredentialSpec -AccountName WebApp01",
					"}",
					"# Scheduling onboot",
					"$trigger =  New-ScheduledTaskTrigger -AtStartup",
					"$bootfix | set-content c:\\Scripts\\gMSA.ps1",
					"$action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument 'c:\\scripts\\gMSA.ps1'",
					"Register-ScheduledTask -Action $action -Trigger $trigger -TaskName 'CreateCredSpecFile' -Description 'CreateCredFile and saves it in default folder' -RunLevel Highest -User $username -Password $Secret.Password",
					"# Reboot to apply changes",
					"Restart-Computer -Force",
					"",
				],
			},
			targets: [
				{
					key: "tag:aws:autoscaling:groupName",
					values: [this.asg.autoScalingGroupName],
				},
			],
		});
	}
}

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

import { Construct } from "constructs";
import {
	aws_iam as iam,
	aws_ec2 as ec2,
	aws_ssm as ssm,
	CfnOutput,
	aws_secretsmanager,
} from "aws-cdk-lib";

/**
 * The properties for the WindowsNode class.
 */
export interface IWindowsNodeProps {
	/**
	 * The VPC to use <required>
	 * @default - 'No default'.
	 */
	vpc: ec2.IVpc;
	/**
	 * IAM Instance role permissions
	 * @default - 'AmazonSSMManagedInstanceCore, AmazonSSMDirectoryServiceAccess'.
	 */
	iamManagedPoliciesList?: iam.IManagedPolicy[];
	/**
	 * The EC2 Instance type to use
	 *
	 * @default - 'm5.2xlarge'.
	 */
	instanceType?: string;
	/**
	 * Choose if to launch the instance in Private or in Public subnet
	 * Private = Subnet that routes to the internet, but not vice versa.
	 * Public = Subnet that routes to the internet and vice versa.
	 * @default - Private.
	 */
	usePrivateSubnet?: boolean;
	/**
	 * Secret Stored in Secrets Manager to join the domain (Domain Admin) with the domain name
	 */
	secret: aws_secretsmanager.ISecret;
	/**
	 * The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex
	 *  @default - 'Windows_Server-2022-English-Full'
	 */
	amiName?: string;
	/**
	 * UserData string
	 *  @default - 'No'
	 */
	userData?: string;
}

/**
 * The WindowsNode class.
 */
export class WindowsNode extends Construct {
	readonly instance: ec2.Instance;
	readonly nodeRole: iam.Role;

	constructor(scope: Construct, id: string, props: IWindowsNodeProps) {
		super(scope, id);
		props.iamManagedPoliciesList = props.iamManagedPoliciesList ?? [
			iam.ManagedPolicy.fromAwsManagedPolicyName(
				"AmazonSSMManagedInstanceCore"
			),
		];

		props.usePrivateSubnet = props.usePrivateSubnet ?? false;
		props.userData = props.userData ?? "";

		const nodeImage = new ec2.LookupMachineImage({
			name: props.amiName ?? "*Windows_Server-2022-English-Full*",
			windows: true,
		});

		this.nodeRole = new iam.Role(this, id + "-instance-role", {
			assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
			managedPolicies: props.iamManagedPoliciesList,
		});

		const securityGroup = new ec2.SecurityGroup(this, id + "-securityGroup", {
			vpc: props.vpc,
		});

		this.instance = new ec2.Instance(this, id + "-ec2instance", {
			instanceType: new ec2.InstanceType(props.instanceType ?? "m5.large"),
			machineImage: nodeImage,
			vpc: props.vpc,
			role: this.nodeRole,
			securityGroup: securityGroup,
			vpcSubnets: props.vpc.selectSubnets({
				subnetType: props.usePrivateSubnet
					? ec2.SubnetType.PRIVATE_WITH_NAT
					: ec2.SubnetType.PUBLIC,
				onePerAz: true,
			}),
		});

		if (props.userData != "") {
			this.instance.addUserData(props.userData);
		}

		this.instance.addUserData(`
		#domain join with secret from secret manager
		[string]$SecretAD  = "${props.secret.secretName}"
		$SecretObj = Get-SECSecretValue -SecretId $SecretAD
		[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)
		$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force
		$username   = $Secret.UserID + "@" + $Secret.Domain
		$credential = New-Object System.Management.Automation.PSCredential($username,$password)
		Add-Computer -DomainName $Secret.Domain -Credential $credential
		Restart-Computer -Force
    `);

		new CfnOutput(this, id + "-stack-output", {
			value: `InstanceId: ${this.instance.instanceId}; dnsName: ${this.instance.instancePublicDnsName}`,
		});
	}

	/**
	 * Running powershell scripts on the Node with SSM Document.
	 * i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript")
	 */
	runPsCommands(psCommands: string[], id: string) {
		new ssm.CfnAssociation(this, id, {
			name: "AWS-RunPowerShellScript",
			parameters: {
				commands: psCommands,
			},
			targets: [{ key: "InstanceIds", values: [this.instance.instanceId] }],
		});
	}
	/**
	 * Open the security group of the Node Node to specific IP address on port 3389
	 * i.e: openRDP("1.1.1.1/32")
	 */
	openRDP(ipaddress: string) {
		this.instance.connections.allowFrom(
			ec2.Peer.ipv4(ipaddress),
			ec2.Port.tcp(3389),
			"Allow RDP"
		);
	}

	runPSwithDomainAdmin(
		psCommands: string[],
		secret: aws_secretsmanager.ISecret,
		id: string
	) {
		var commands = ["$onTimePS = {"];
		psCommands.forEach((command: string) => {
			commands.push(command);
		});
		commands.push(
			"}",
			`[string]$SecretAD  = '${secret.secretName}'`,
			"$SecretObj = Get-SECSecretValue -SecretId $SecretAD",
			"[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)",
			"$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force",
			"$username   = $Secret.UserID + '@' + $Secret.Domain",
			"$domain_admin_credential = New-Object System.Management.Automation.PSCredential($username,$password)",
			"New-Item -ItemType Directory -Path c:\\Scripts",
			"$onTimePS | set-content c:\\Scripts\\onTimePS.ps1",
			"# Create a scheduled task to run now with domain user",
			"$action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument 'c:\\scripts\\onTimePS.ps1'",
			"$trigger =  New-ScheduledTaskTrigger -Once -At (Get-Date)",
			"Register-ScheduledTask -Action $action -Trigger $trigger -TaskName 'PSTaskOnce' -Description 'Workaround to run with domain user' -RunLevel Highest -User $username -Password $Secret.Password",
			""
		);
		new ssm.CfnAssociation(this, id, {
			name: "AWS-RunPowerShellScript",
			parameters: {
				commands: commands,
			},
			targets: [{ key: "InstanceIds", values: [this.instance.instanceId] }],
		});
	}
}

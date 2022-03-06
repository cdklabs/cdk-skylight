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
  aws_iam as iam,
  aws_ec2 as ec2,
  aws_ssm as ssm,
  CfnOutput,
  aws_ssm,
  aws_ec2,
  Stack,
  Fn,
} from 'aws-cdk-lib';
import { AwsCustomResource, AwsCustomResourcePolicy } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import * as skylight from '../index';

/**
 * The properties of an DomainWindowsNodeProps, requires Active Directory parameter to read the Secret to join the domain
 * Default setting: Domain joined, m5.2xlarge, latest windows, Managed by SSM.
 */
export interface IDomainWindowsNodeProps {
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
	 * The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex
	 *  @default - 'Windows_Server-2022-English-Full'
	 */
  amiName?: string;
  /**
	 * Specific UserData to use
	 *
	 * The UserData may still be mutated after creation.
	 *
	 *  @default - 'No default'
	 */
  userData?: string;

  /**
   * @default - 'true'
   */
  domainJoin?: boolean;

  /**
   * @default - 'true'
   */
  windowsMachine?: boolean;

  /**
	 * The VPC to use
	 */
  vpc: ec2.IVpc;

  /**
	 * The Managed AD Parameter store to use (only when domainJoin = True), should contain the secret name (Secrets manager) and the namespace to find the secret.
	 * i.e: {namespace = "cdk-skylight", secretPointer = "mad-secret"}.
	 * Please note: `secretPointer` is the name of the SSM parameter and not the secret name. The secret name should be stored in the provided parameter.
	 *
	 * @default - 'No default'.
	 */
  madSsmParameters?: skylight.authentication.IAdAuthenticationParameters;
}

/**
 * A Domain Windows Node represents one Windows EC2 instance configured with Active Directory.
 *
 * The DomainWindowsNode can be customized to different instance sizes and additional permissions set just like any other EC2 Instance.
 * You can use this construct to run elevated domain tasks with domain permissions or run your application in a single instance setup.
 *
 * The machine will be joined to the provided Active Directory domain using a custom CloudFormation bootstrap that will wait until the required reboot to join the domain. Then it will register the machine in SSM and pull tasks from the SSM State manager.
 *
 * You can send tasks to that machine using the provided methods: runPsCommands() and runPSwithDomainAdmin()
 *
 */
export class DomainWindowsNode extends Construct {
  readonly instance: ec2.Instance;
  readonly nodeRole: iam.Role;
  readonly vpc: ec2.IVpc;
  readonly secretName: string;

  constructor(scope: Construct, id: string, props: IDomainWindowsNodeProps) {
    super(scope, id);
    props.iamManagedPoliciesList = props.iamManagedPoliciesList ?? [
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'AmazonSSMManagedInstanceCore',
      ),
      iam.ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'),
    ];

    props.usePrivateSubnet = props.usePrivateSubnet ?? false;
    props.userData = props.userData ?? '';
    props.domainJoin = props.domainJoin ?? true;
    props.windowsMachine = props.windowsMachine ?? true;

    this.vpc = props.vpc;

    if (props.domainJoin) {
      props.madSsmParameters = props.madSsmParameters!;
      // Look for the secret to join the Managed AD
      this.secretName = aws_ssm.StringParameter.valueForStringParameter(
        this,
        `/${props.madSsmParameters.namespace}/${props.madSsmParameters.secretPointer}`,
      );
    } else {
      this.secretName = '';
    }

    const nodeImage = new ec2.LookupMachineImage({
      name: props.amiName ?? '*Windows_Server-2022-English-Full*',
      windows: props.windowsMachine,
    });

    this.nodeRole = new iam.Role(this, id + '-instance-role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: props.iamManagedPoliciesList,
    });

    const securityGroup = new ec2.SecurityGroup(this, id + '-securityGroup', {
      vpc: this.vpc,
    });

    // Setting static logical ID for the Worker, to allow further customization
    const workerName = 'ec2InstanceWorker';

    if (props.domainJoin) {
      // Create CloudFormation Config set to allow the Domain join report back to Cloudformation only after reboot.
      const config = ec2.CloudFormationInit.fromConfigSets({
        configSets: {
          domainJoinRestart: ['domainJoin', 'signal'],
        },
        configs: {
          domainJoin: new ec2.InitConfig([
            ec2.InitCommand.shellCommand(
              // Step1 : Domain Join using the Secret provided
              `powershell.exe -command  "Invoke-Command -ScriptBlock {[string]$SecretAD  = '${this.secretName}' ;$SecretObj = Get-SECSecretValue -SecretId $SecretAD ;[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json) ;$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force ;$username   = $Secret.UserID + '@' + $Secret.Domain ;$credential = New-Object System.Management.Automation.PSCredential($username,$password) ;Add-Computer -DomainName $Secret.Domain -Credential $credential; Restart-Computer -Force}"`,
              {
                waitAfterCompletion: ec2.InitCommandWaitDuration.forever(),
              },
            ),
          ]),
          signal: new ec2.InitConfig([
            ec2.InitCommand.shellCommand(
              // Step 3: CloudFormation signal
              `cfn-signal.exe --success=true --resource=${workerName} --stack=${
                Stack.of(this).stackName
              } --region=${Stack.of(this).region}`,
              {
                waitAfterCompletion: ec2.InitCommandWaitDuration.none(),
              },
            ),
          ]),
        },
      });
      const attachInitOptions: ec2.AttachInitOptions = {
        platform: ec2.OperatingSystemType.WINDOWS,
        configSets: ['domainJoinRestart'],
        instanceRole: this.nodeRole,
        userData: aws_ec2.UserData.custom(''),
        embedFingerprint: false,
      };

      this.instance = new ec2.Instance(this, id + '-ec2instance', {
        instanceType: new ec2.InstanceType(props.instanceType ?? 'm5.large'),
        machineImage: nodeImage,
        vpc: this.vpc,
        role: this.nodeRole,
        securityGroup: securityGroup,
        vpcSubnets: this.vpc.selectSubnets({
          subnetType: props.usePrivateSubnet
            ? ec2.SubnetType.PRIVATE_WITH_NAT
            : ec2.SubnetType.PUBLIC,
          onePerAz: true,
        }),
        init: config,
        initOptions: attachInitOptions,
      });

      // Override the logical ID name so it can be refereed before initialized
      const CfnInstance = this.instance.node.defaultChild as ec2.CfnInstance;
      CfnInstance.overrideLogicalId(workerName);

      // Override the default UserData script to execute only the cfn-init (without cfn-signal) as we want cfn-signal to be executed after reboot. More details here: https://aws.amazon.com/premiumsupport/knowledge-center/create-complete-bootstrapping/
      CfnInstance.userData = Fn.base64(
        `<powershell>cfn-init.exe -v -s ${
          Stack.of(this).stackName
        } -r ${workerName} --configsets=domainJoinRestart --region ${
          Stack.of(this).region
        }</powershell>`,
      );

      // Override the default 5M timeout to support longer Windows boot time
      CfnInstance.cfnOptions.creationPolicy = {
        resourceSignal: {
          count: 1,
          timeout: 'PT30M',
        },
      };
    } else {
      this.instance = new ec2.Instance(this, id + '-ec2instance', {
        instanceType: new ec2.InstanceType(props.instanceType ?? 'm5.large'),
        machineImage: nodeImage,
        vpc: this.vpc,
        role: this.nodeRole,
        securityGroup: securityGroup,
        vpcSubnets: this.vpc.selectSubnets({
          subnetType: props.usePrivateSubnet
            ? ec2.SubnetType.PRIVATE_WITH_NAT
            : ec2.SubnetType.PUBLIC,
          onePerAz: true,
        }),
      });
    }


    // Append the user data
    if (props.userData != '') {
      this.instance.addUserData(props.userData);
    }

    new CfnOutput(this, id + '-stack-output', {
      value: `InstanceId: ${this.instance.instanceId}; dnsName: ${this.instance.instancePublicDnsName}`,
    });
  }

  /**
	 * Running bash scripts on the Node with SSM Document.
	 * i.e: runPsCommands(["echo 'hello world'", "echo 'Second command'"], "myScript")
	 */
  runShellCommands(ShellCommands: string[], id: string) {
    new ssm.CfnAssociation(this, id, {
      name: 'AWS-RunShellScript',
      parameters: {
        commands: ShellCommands,
      },
      targets: [{ key: 'InstanceIds', values: [this.instance.instanceId] }],
      maxErrors: '5',
      maxConcurrency: '1',
    });
  }

  /**
	 * Running PowerShell scripts on the Node with SSM Document.
	 * i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript")
	 */
  runPsCommands(psCommands: string[], id: string) {
    new ssm.CfnAssociation(this, id, {
      name: 'AWS-RunPowerShellScript',
      parameters: {
        commands: psCommands,
      },
      targets: [{ key: 'InstanceIds', values: [this.instance.instanceId] }],
      maxErrors: '5',
      maxConcurrency: '1',
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
      'Allow RDP',
    );
  }

  /**
	 * Running PowerShell scripts on the Node with SSM Document with Domain Admin (Using the Secret used to join the machine to the domain)
	 * i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript")
	 * The provided psCommands will be stored in C:\Scripts and will be run with scheduled task with Domain Admin rights
	 */
  runPSwithDomainAdmin(psCommands: string[], id: string) {
    var commands = ['$oneTimePS = {'];
    psCommands.forEach((command: string) => {
      commands.push(command);
    });
    commands.push(
      '}',
      `[string]$SecretAD  = '${this.secretName}'`,
      '$SecretObj = Get-SECSecretValue -SecretId $SecretAD',
      '[PSCustomObject]$Secret = ($SecretObj.SecretString  | ConvertFrom-Json)',
      '$password   = $Secret.Password | ConvertTo-SecureString -asPlainText -Force',
      "$username   = $Secret.Domain + '\\' + $Secret.UserID",
      '$domain_admin_credential = New-Object System.Management.Automation.PSCredential($username,$password)',
      'New-Item -ItemType Directory -Path c:\\Scripts',
      '$tempScriptPath = "C:\\Scripts\\$PID.ps1"',
      '$oneTimePS | set-content $tempScriptPath',
      '# Create a scheduled task on startup to execute the mapping',
      '$action = New-ScheduledTaskAction -Execute "Powershell.exe" -Argument $tempScriptPath',
      '$trigger =  New-ScheduledTaskTrigger -Once -At (get-date).AddSeconds(10); ',
      '$trigger.EndBoundary = (get-date).AddSeconds(60).ToString("s") ',
      'Register-ScheduledTask -Force -Action $action -Trigger $trigger -TaskName "Task $PID to run with DomainAdmin" -Description "Workaround to run the code with domain admin" -RunLevel Highest -User $username -Password $Secret.Password',
    );
    new ssm.CfnAssociation(this, id, {
      name: 'AWS-RunPowerShellScript',
      parameters: {
        commands: commands,
      },
      targets: [{ key: 'InstanceIds', values: [this.instance.instanceId] }],
      maxErrors: '5',
      maxConcurrency: '1',
    });
  }

  startInstance() {
    new AwsCustomResource(this, 'start-instance-needed-'+ this.instance.instanceId, {
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
      onUpdate: {
        service: 'EC2',
        action: 'startInstances', // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#startInstances-property
        parameters: {
          InstanceIds: [this.instance.instanceId],
        },
        physicalResourceId: {
          id: 'startInstance-' + this.instance.instanceId,
        },
      },
    });
  }
}

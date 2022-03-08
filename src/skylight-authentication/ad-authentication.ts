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
import {
  aws_directoryservice as mad,
  aws_ec2 as ec2,
  aws_route53resolver as r53resolver,
  aws_secretsmanager as secretsmanager,
  aws_ssm,
  CfnOutput,
  Fn,
} from 'aws-cdk-lib';
import { CfnMicrosoftAD } from 'aws-cdk-lib/aws-directoryservice';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import * as skylight from '../index';
/**
 * The properties for the AwsManagedMicrosoftAd class.
 */
export interface IAwsManagedMicrosoftAdProps {
  /**
   * The domain name for the Active Directory Domain.
   *
   * @default - 'domain.aws'.
   */
  domainName?: string;
  /**
   * The edition to use for the Active Directory Domain.
   * Allowed values: Enterprise | Standard
   * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-directoryservice-microsoftad.html#cfn-directoryservice-microsoftad-edition
   * @default - 'Standard'.
   */
  edition?: string;
  /**
   * The secrets manager secret to use must be in format:
   * '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}'
   * @default - 'Randomly generated and stored in Secret Manager'.
   */
  secret?: secretsmanager.ISecret;
  /**
   * The secret name to save the Domain Admin object
   * @default - '<domain.name>-secret'.
   */
  secretName?: string;
  /**
   * The VPC to use, must have private subnets.
   */
  vpc: ec2.IVpc;

  /**
   * The configuration store to save the directory parameters (After deployed)
   */
  configurationStore?: IAwsManagedMicrosoftAdParameters;

  /**
   * Create Domain joined machine to be used to run Powershell commands to that directory. (i.e Create Ad Group)
   * @default - 'true'.
   */
  createWorker?: boolean;
}

export enum AwsManagedMicrosoftConfigurationStoreType {
  SSM = 'AWS Systems Manager Parameter Store',
}

/**
 * The properties of an DomainWindowsNodeProps, requires Active Directory parameter to read the Secret to join the domain
 * Default setting: Domain joined, m5.2xlarge, latest windows, Managed by SSM.
 */
export interface IAwsManagedMicrosoftAdParameters {
  /**
   * The name of the Configuration Store Type to use
   * @default - 'AWS Systems Manager Parameter Store'.
   */
  configurationStoreType?: AwsManagedMicrosoftConfigurationStoreType;
  /**
   * The name of the SSM Object that contains the secret name in Secrets Manager
   * @default - 'domain-secret'.
   */
  secretPointer?: string;

  /**
   * The name of the SSM Object that contains the Directory ID
   * @default - 'directoryID'.
   */
  directoryIDPointer?: string;

  /**
   * The SSM namespace to read/write parameters to
   * @default - 'cdk-skylight'.
   */
  namespace?: string;
}

/**
 * A Ad Authentication represents an integration pattern of Managed AD and Route 53 Resolver in a specific VPC
 *
 * The Construct creates Managed AD with the provided Secret (Secrets Manager) or generates a new Secret.
 * The secret saved to SSM parameter store so others can use it with other Constructs (Such as Windows node or FSx)
 * The provided VPC or the new created VPC will be configured to forward DNS requests to the Managed AD with Route53 Resolvers
 * The construct also creates (optionally) t3.nano machine that is part of the domain that can be used to run admin-tasks (such as createADGroup)
 *
 * The createADGroup() method creates an Active Directory permission group in the domain, using the domain admin user.
 * Please note: When calling createADGroup() API, a Lambda will be created to start the worker machine (Using AWS-SDK),
 * then each command will be scheduled with State Manager, and the instance will be shut down after complete.
 *
 */
export class AwsManagedMicrosoftAd extends Construct {
  readonly adObject: CfnMicrosoftAD;
  readonly adParameters: IAwsManagedMicrosoftAdParameters;
  readonly props: IAwsManagedMicrosoftAdProps;
  readonly worker?: skylight.compute.DomainWindowsNode;
  readonly secret: ISecret;
  constructor(
    scope: Construct,
    id: string,
    props: IAwsManagedMicrosoftAdProps
  ) {
    super(scope, id);
    this.props = props;
    this.props.domainName = props.domainName ?? 'domain.aws';
    this.props.edition = props.edition ?? 'Standard';
    this.props.secretName = props.secretName ?? `${props.domainName}-secret`;
    this.props.createWorker = props.createWorker ?? true;

    this.adParameters = props.configurationStore ?? {
      configurationStoreType: AwsManagedMicrosoftConfigurationStoreType.SSM,
    };
    this.adParameters.secretPointer =
      this.adParameters.secretPointer ?? 'domain-secret';

    this.adParameters.directoryIDPointer =
      this.adParameters.directoryIDPointer ?? 'directoryID';

    if (this.adParameters.namespace) {
      this.adParameters.namespace = `${this.adParameters.namespace}/authentication/mad`;
    } else {
      this.adParameters.namespace = 'cdk-skylight/authentication/mad';
    }

    this.secret =
      this.props.secret ??
      new secretsmanager.Secret(this, 'Secret', {
        generateSecretString: {
          secretStringTemplate: JSON.stringify({
            Domain: props.domainName,
            UserID: 'Admin',
          }),
          generateStringKey: 'Password',
          excludePunctuation: true,
        },
        secretName: props.secretName,
      });

    new aws_ssm.StringParameter(this, 'mad-secretName-pointer', {
      parameterName: `/${this.adParameters.namespace}/${this.adParameters.secretPointer}`,
      stringValue: this.props.secretName,
    });

    const subnets =
      props.vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      }) ??
      props.vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      });

    new CfnOutput(this, id + '-SSM-GetSecret', {
      value: `aws secretsmanager get-secret-value --secret-id ${
        this.secret.secretArn
      } --query SecretString --output text --region ${'region'}`, //need to fix the region
    });

    this.adObject = new mad.CfnMicrosoftAD(
      this,
      id + '-managedDirectoryObject',
      {
        password: this.secret.secretValueFromJson('Password').toString(),
        edition: props.edition,
        name: this.props.domainName,
        vpcSettings: {
          subnetIds: [subnets.subnetIds[0], subnets.subnetIds[1]],
          vpcId: props.vpc.vpcId,
        },
      }
    );

    new aws_ssm.StringParameter(this, 'mad-directoryID-pointer', {
      parameterName: `/${this.adParameters.namespace}/${this.adParameters.directoryIDPointer}`,
      stringValue: this.adObject.ref,
    });

    const sg = new ec2.SecurityGroup(this, id + '-r53-outbound-Resolver-SG', {
      vpc: props.vpc,
    });
    sg.addIngressRule(ec2.Peer.ipv4(props.vpc.vpcCidrBlock), ec2.Port.udp(53));
    sg.addIngressRule(ec2.Peer.ipv4(props.vpc.vpcCidrBlock), ec2.Port.tcp(53));

    const outBoundResolver = new r53resolver.CfnResolverEndpoint(
      this,
      id + '-r53-endpoint',
      {
        direction: 'OUTBOUND',
        ipAddresses: subnets.subnetIds.map((s) => {
          return { subnetId: s };
        }),
        securityGroupIds: [sg.securityGroupId],
      }
    );

    const resolverRules = new r53resolver.CfnResolverRule(
      this,
      id + '-r53-resolver-rules',
      {
        domainName: this.props.domainName,
        resolverEndpointId: outBoundResolver.ref,
        ruleType: 'FORWARD',
        targetIps: [
          { ip: Fn.select(0, this.adObject.attrDnsIpAddresses) },
          { ip: Fn.select(1, this.adObject.attrDnsIpAddresses) },
        ],
      }
    );

    new r53resolver.CfnResolverRuleAssociation(
      this,
      id + '-r53-resolver-association',
      {
        resolverRuleId: resolverRules.attrResolverRuleId,
        vpcId: props.vpc.vpcId,
      }
    );

    if (this.props.createWorker) {
      this.worker = this.createWorker(this.props.domainName, this.secret);
      this.worker.runPSwithDomainAdmin(
        ['Add-WindowsFeature RSAT-AD-PowerShell'],
        'ad-powershell'
      );
      this.worker.node.addDependency(this.adObject);
    } else {
      this.worker = undefined;
    }
  }

  // Creates DomainWindowsNode that will be used to run admin-tasks to this directory
  createWorker(
    domainName: string,
    domainPassword: ISecret
  ): skylight.compute.DomainWindowsNode {
    return new skylight.compute.DomainWindowsNode(this, 'madWorker', {
      domainName: domainName,
      passwordObject: domainPassword,
      vpc: this.props.vpc,
      instanceType: 't3.small',
    });
  }

  // The function creates a Lambda to Start the Windows Worker, then creates SSM Document and Desired state in State Manager to schedule this document on the Worker.
  createADGroup(groupName: string, groupDescription: string) {
    if (this.worker) {
      new AwsCustomResource(this, 'start-instance-needed', {
        policy: AwsCustomResourcePolicy.fromSdkCalls({
          resources: AwsCustomResourcePolicy.ANY_RESOURCE,
        }),
        onUpdate: {
          service: 'EC2',
          action: 'startInstances', // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#startInstances-property
          parameters: {
            InstanceIds: [this.worker.instance.instanceId],
          },
          physicalResourceId: {
            id: 'startInstance-' + groupName,
          },
        },
      });
      this.worker.runPSwithDomainAdmin(
        [
          `New-ADGroup -Name "${groupDescription}" -SamAccountName "${groupName}" -GroupScope DomainLocal`,
          'Stop-Computer -ComputerName localhost',
        ],
        'createAdGroup'
      );
    } else {
      console.log("Can't create AD group when no Worker is defined");
    }
  }

  // Experimental
  createServiceAccount(
    adServiceAccountName: string,
    servicePrincipalNames: string,
    principalsAllowedToRetrieveManagedPassword: string
  ) {
    if (this.worker) {
      this.worker.runPSwithDomainAdmin(
        [
          `New-ADServiceAccount -Name "${adServiceAccountName}" -DnsHostName "${adServiceAccountName}.${this.props.domainName}" -ServicePrincipalNames "${servicePrincipalNames}" -PrincipalsAllowedToRetrieveManagedPassword "${principalsAllowedToRetrieveManagedPassword}"`,
        ],
        'createServiceAccount'
      );
    } else {
      console.log("Can't createServiceAccount when no Worker is defined");
    }
  }
}

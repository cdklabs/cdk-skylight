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
import { Construct } from 'constructs';
/**
 * The properties for the AdAuthentication class.
 */
export interface IADAuthenticationProps {
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

  ssmParameters?: IAdAuthenticationParameters;
}
export interface IAdAuthenticationParameters {
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
export class AdAuthentication extends Construct {
  readonly adObject: CfnMicrosoftAD;
  readonly ssmParameters: IAdAuthenticationParameters;

  constructor(scope: Construct, id: string, props: IADAuthenticationProps) {
    super(scope, id);
    props.domainName = props.domainName ?? 'domain.aws';
    props.edition = props.edition ?? 'Standard';
    props.secretName = props.secretName ?? `${props.domainName}-secret`;

    this.ssmParameters = props.ssmParameters ?? {};
    this.ssmParameters.secretPointer =
			this.ssmParameters.secretPointer ?? 'domain-secret';

    this.ssmParameters.directoryIDPointer =
			this.ssmParameters.directoryIDPointer ?? 'directoryID';

    if (this.ssmParameters.namespace) {
      this.ssmParameters.namespace = `${this.ssmParameters.namespace}/authentication/mad`;
    } else {
      this.ssmParameters.namespace = 'cdk-skylight/authentication/mad';
    }

    const secret =
			props.secret ??
			new secretsmanager.Secret(this, `${id}-${props.domainName}-secret`, {
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
      parameterName: `/${this.ssmParameters.namespace}/${this.ssmParameters.secretPointer}`,
      stringValue: props.secretName,
    });

    const subnets = props.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
    });

    new CfnOutput(this, id + '-SSM-GetSecret', {
      value: `aws secretsmanager get-secret-value --secret-id ${
        secret.secretArn
      } --query SecretString --output text --region ${'region'}`, //need to fix the region
    });

    this.adObject = new mad.CfnMicrosoftAD(
      this,
      id + '-managedDirectoryObject',
      {
        password: secret.secretValueFromJson('Password').toString(),
        edition: props.edition,
        name: props.domainName,
        vpcSettings: {
          subnetIds: [subnets.subnetIds[0], subnets.subnetIds[1]],
          vpcId: props.vpc.vpcId,
        },
      },
    );

    new aws_ssm.StringParameter(this, 'mad-directoryID-pointer', {
      parameterName: `/${this.ssmParameters.namespace}/${this.ssmParameters.directoryIDPointer}`,
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
      },
    );

    const resolverRules = new r53resolver.CfnResolverRule(
      this,
      id + '-r53-resolver-rules',
      {
        domainName: props.domainName,
        resolverEndpointId: outBoundResolver.ref,
        ruleType: 'FORWARD',
        targetIps: [
          { ip: Fn.select(0, this.adObject.attrDnsIpAddresses) },
          { ip: Fn.select(1, this.adObject.attrDnsIpAddresses) },
        ],
      },
    );

    new r53resolver.CfnResolverRuleAssociation(
      this,
      id + '-r53-resolver-association',
      {
        resolverRuleId: resolverRules.attrResolverRuleId,
        vpcId: props.vpc.vpcId,
      },
    );
  }
}

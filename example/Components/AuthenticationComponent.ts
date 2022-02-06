import { aws_ec2, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AdAuthentication } from '../../skylight-authentication/adauthentication';

export class AuthenticationComponent extends Stack {
  constructor(
    scope: Construct,
    id: string,
    namespace: string,
    vpc: aws_ec2.IVpc,
    props?: StackProps,
  ) {
    super(scope, id, props);
    new AdAuthentication(this, 'auth', {
      vpc: vpc,
      domainName: 'myDomain.aws',
      namespace: namespace,
    });
  }
}

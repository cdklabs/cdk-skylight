import { App, aws_ec2, Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import * as skylight from '../src';

const env = {
  account: '1111111111',
  region: 'us-east-1',
};
const app = new App();
const stack = new Stack(app, 'test', { env: env });
const vpc = new aws_ec2.Vpc(stack, 'vpc', {});

test('authentication', () => {
  const mad = new skylight.authentication.AwsManagedMicrosoftAd(
    stack,
    'AwsManagedMicrosoftAd',
    {
      vpc: vpc,
    },
  );
  const mad2 = new skylight.authentication.AwsManagedMicrosoftAd(
    stack,
    'AwsManagedMicrosoftAd2',
    {
      vpc: vpc,
      edition: 'enterprise',
      secret: new Secret(stack, 'test-secret'),
      domainName: 'test-domain',
      secretName: 'custom-secret-name',
      createWorker: false,
    },
  );
  mad2.createServiceAccount('test1', 'test2', 'Test3');
  const mad3 = new skylight.authentication.AwsManagedMicrosoftAd(
    stack,
    'AwsManagedMicrosoftAd3',
    {
      vpc: vpc,
      edition: 'enterprise',
      secretName: 'custom-secret-name',
      configurationStore: {
        namespace: 'custom-namespace',
        secretPointer: 'secret-pointer',
        directoryIDPointer: 'directory-pointer',
      },
      createWorker: false,
    },
  );
  mad3.createADGroup('test', 'test2');
  mad.createADGroup('Test', 'test2');
  mad.createServiceAccount('test', 'Test2', 'test3');
  expect(mad2).toHaveProperty(
    'adParameters.namespace',
    'cdk-skylight/authentication/mad',
  );
  expect(mad3).toHaveProperty(
    'adParameters.namespace',
    'custom-namespace/authentication/mad',
  );
  expect(mad).toHaveProperty(
    'adObject.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
});

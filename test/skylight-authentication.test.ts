import { App, aws_ec2, Stack } from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import * as skylight from '../src';

const env = {
  account: '1111111111',
  region: 'us-east-1',
};
const app = new App();
const stack = new Stack(app, 'test', { env: env });
const vpc = new aws_ec2.Vpc(stack, 'vpc', {});
const vpcWithCustomSubnets = new aws_ec2.Vpc(stack, 'vpcwithsub', {
  maxAzs: 2,
  subnetConfiguration: [
    { name: 'Data', subnetType: SubnetType.PRIVATE_WITH_NAT },
    { name: 'Public', subnetType: SubnetType.PUBLIC },
  ],
});

test('authentication', () => {
  const mad = new skylight.authentication.AwsManagedMicrosoftAd(
    stack,
    'AwsManagedMicrosoftAd',
    {
      vpc: vpc,
      createWorker: true,
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
  const mad4 = new skylight.authentication.AwsManagedMicrosoftAd(
    stack,
    'AwsManagedMicrosoftAd4',
    {
      vpc: vpcWithCustomSubnets,
      vpcSubnets: vpcWithCustomSubnets.selectSubnets({ subnetGroupName: 'Data' }),
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
    'microsoftAD.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
  expect(mad4).toHaveProperty(
    'microsoftAD.vpcSettings.subnetIds',
    vpcWithCustomSubnets.selectSubnets({ subnetGroupName: 'Data' }).subnetIds,
  );
});

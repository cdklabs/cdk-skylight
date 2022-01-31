import { aws_ec2, Stack } from 'aws-cdk-lib';
import { AdAuthentication } from '../src';

test('authentication', () => {
  const stack = new Stack();
  const mad = new AdAuthentication(stack, 'AdAuthentication', {
    vpc: new aws_ec2.Vpc(stack, 'vpc', {}),
    namespace: '/test',
  });
  expect(mad).toHaveProperty(
    'ad.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
  expect(mad).toHaveProperty('secret.physicalName', mad.ad.name + '-secret');
});

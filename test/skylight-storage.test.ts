import { App, aws_ec2, Stack } from 'aws-cdk-lib';
import * as skylight from '../src';

const env = {
  account: '1111111111',
  region: 'us-east-1',
};
const app = new App();
const stack = new Stack(app, 'test', { env: env });
const vpc = new aws_ec2.Vpc(stack, 'vpc', {});

test('storageTest', () => {
  const storage = new skylight.storage.FSxWindows(stack, 'PersistentStorage', {
    directoryId: 'd-1234567',
    vpc: vpc,
  });
  storage.smbMountAddress();
  expect(storage).toHaveProperty(
    'fsxObject.cfnResourceType',
    'AWS::FSx::FileSystem',
  );
});

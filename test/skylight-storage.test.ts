import { aws_ec2, Stack } from 'aws-cdk-lib';
import * as skylight from '../src';

test('storageTest', () => {
  const stack = new Stack();
  const storage = new skylight.storage.FSxWindows(stack, 'PersistentStorage', '/test', {
    vpc: new aws_ec2.Vpc(stack, 'vpc', {}),
  });
  expect(storage).toHaveProperty(
    'storageObject.cfnResourceType',
    'AWS::FSx::FileSystem',
  );
});

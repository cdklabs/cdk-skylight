import { App, aws_ec2, Stack } from 'aws-cdk-lib';
import { WindowsEKSCluster, WindowsEKSNodes, WindowsNode } from '../src';

const env = {
  account: '1111111111',
  region: 'us-east-1',
};
const app = new App();
const stack = new Stack(app, 'test', { env: env });
const vpc = new aws_ec2.Vpc(stack, 'vpc', {});

test('Skylight-WindowsNode', () => {
  const windowsnode = new WindowsNode(stack, 'WindowsNode', '/test', {
    vpc: vpc,
  });
  expect(windowsnode).toHaveProperty(
    'instance.instance.cfnResourceType',
    'AWS::EC2::Instance',
  );
});

//EKS
test('Skylight-WindowsEKSNodes', () => {
  const nodes = new WindowsEKSNodes(
    stack,
    'WindowsEKSNodes',
    vpc,
    new aws_ec2.InstanceType('m5.large'),
  );
  expect(nodes).toHaveProperty(
    'asgResource.cfnResourceType',
    'AWS::AutoScaling::AutoScalingGroup',
  );
});

test('Skylight-WindowsEKSCluster', () => {
  const cluster = new WindowsEKSCluster(stack, 'ElasticCluster', vpc, '/test');
  expect(cluster).toHaveProperty('eksCluster.clusterName');
});

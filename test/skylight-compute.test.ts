import { App, aws_ec2, Stack } from 'aws-cdk-lib';
import * as skylight from '../src';

const env = {
  account: '1111111111',
  region: 'us-east-1',
};
const app = new App();
const stack = new Stack(app, 'test', { env: env });
const vpc = new aws_ec2.Vpc(stack, 'vpc', {});

const cluster = new skylight.compute.WindowsEKSCluster(
  stack,
  'ElasticCluster',
  {
    vpc: vpc,
    eksSsmParameters: {},
  }
);

test('Skylight-WindowsNode', () => {
  const windowsNodeObject = new skylight.compute.DomainWindowsNode(
    stack,
    'WindowsNode',
    {
      vpc: vpc,
      userData: 'hello',
    }
  );
  windowsNodeObject.runPsCommands(['echo hello world'], 'hello');

  windowsNodeObject.openRDP('1.1.1.1/32');
  expect(windowsNodeObject).toHaveProperty(
    'instance.instance.cfnResourceType',
    'AWS::EC2::Instance'
  );
});

//EKS
test('Skylight-WindowsEKSNodes', () => {
  const nodes = new skylight.compute.WindowsEKSNodes(
    stack,
    'WindowsEKSNodesTest',
    {
      vpc: vpc,
    }
  );

  nodes.addAdDependency({});
  nodes.addEKSDependency(cluster.eksCluster);
  nodes.addStorageDependency({}, {}, 'folder');
  nodes.addLocalCredFile({}, 'group', 'account');
  expect(nodes).toHaveProperty(
    'asgResource.cfnResourceType',
    'AWS::AutoScaling::AutoScalingGroup'
  );
});

test('Skylight-WindowsEKSCluster', () => {
  expect(cluster).toHaveProperty('eksCluster.clusterName');
});

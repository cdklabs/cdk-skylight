import {
  aws_ec2,
  aws_secretsmanager,
  aws_ssm,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WindowsEKSCluster } from '../../skylight-compute/eks/windowsEKSCluster';
import { WindowsEKSNodes } from '../../skylight-compute/eks/windowsEKSNodes';

export class ComputeComponent extends Stack {
  constructor(
    scope: Construct,
    id: string,
    namespace: string,
    vpc: aws_ec2.IVpc,
    props?: StackProps,
  ) {
    super(scope, id, props);

    const eks_cluster = new WindowsEKSCluster(
      this,
      'KubeCluster',
      vpc,
      namespace,
    );

    // Runtime
    const myNodes = new WindowsEKSNodes(
      this,
      'myASG',
      vpc,
      new aws_ec2.InstanceType('m5.large'),
    );

    const secretName = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `${namespace}/secretName`,
    );

    const secretObject = aws_secretsmanager.Secret.fromSecretNameV2(
      this,
      'secretImport',
      secretName,
    );

    const storageMount = aws_ssm.StringParameter.valueForStringParameter(
      this,
      `${namespace}/fsx`,
    );

    myNodes.addAdDependency(secretObject);
    myNodes.addStorageDependency(secretObject, storageMount);
    myNodes.addEKSDependency(eks_cluster.eksCluster);
    myNodes.addLocalCredFile(secretObject, 'myEKSNodes', 'myWebApp');
  }
}

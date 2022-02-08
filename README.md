![](https://img.shields.io/badge/CDK%20Skylight-Developer%20Preview-orange.svg?style=for-the-badge)

# CDK Skylight

CDK Skylight is a set of code libraries written with AWS CDK that enables customers to create & provision highly reliable, scalable, and cost-effective applications within the **Microsoft products ecosystem** without worrying about creating and configuring the underlying AWS infrastructure components. (Such as .NET Workloads, Active Directory, SQL Server, NetApp ONTap). CDK Skylight is set to address repetitive tasks and best practices involved with managing, deploying, and integrating those apps. 

In addition to the complexity of integrating the "AWS side" products, Microsoft technologies such as SQL, AD, Windows OS require OS-level integration and optimization. Skylight help in both the "AWS-side" and the "OS-side," offering a complete end-to-end configuration and integration solution of AWS products. 
# Who should use CDK Skylight?

The primary persona to use CDK Skylight is the infrastructure team owners to customize the stacks and provide them to the application owners teams.

For applications that require Active Directory, the application team relies on different teams that handle this part. Therefore, the integration between the application and the Active Directory happens in a dedicated environment. With CDK Skylight, the Active Directory's team owner can provide a custom stack using a pre-defined stack to the teams relying on this Component, allowing the application owner to build the same configuration in the developer account.

# When to use CDK Skylight?

CDK Skylight aims to help in all application lifecycle stages, from the developer’s machine to production environments.


# How to use

```bash
npm install cdk-skylight
```

In your CDK App

```typescript
import * as skylight from "cdk-skylight";

new skylight.authentication.AdAuthentication(scope: Construct, id: string, props: IADAuthenticationProps)

```

# CDK Skylight Constructs 

## Skylight-Authentication

Library of Custom Authentication components 

### **AdAuthentication** - Manged Active Directory with R53 Resolvers 

This construct creates Amazon VPC, Amazon Managed AD, Secret for the domain Admin stored in Secrets Manager and Route 53 forward rule for the domain.
The construct provides a way to customize the configuration and smart defaults for the infrastructures.

Example:

```typescript
const stack = new Stack();
new AdAuthentication(stack, 'AdAuthentication', {
	vpc: new aws_ec2.Vpc(stack, 'MyVpc', {}),
	namespace: '/test',
	domainName: "skylight.aws",
	edition: 'enterprise',
	secret: new Secret(stack, 'test-secret'),
	secretName: 'skylight.aws-secret',
});
```

## Skylight-Compute

Library of Custom Compute components 

### WindowsNode - Windows Generic Worker

The stack creates Windows Server with the latest AMI and joins the machine to the domain. It is possible to send Powershell commands or connect and work from the machine. 

```typescript
const windowsNodeObject = new WindowsNode(stack, 'WindowsNode', '/test', {
	vpc: vpc,
	userData: 'echo "hello-world"',
});
windowsNodeObject.runPsCommands(['echo hello world'], 'hello-world'); // ability to run PS commands after launch (With SSM document)
windowsNodeObject.runPSwithDomainAdmin( // ability to run PS commands with Domain Admin (Using Secret Manager)
	['echo hello world'], // PS Commands array
	new Secret(stack, 'secret'), // Secret with the Domain Credentials
		'hello-withPS',
		);
windowsNodeObject.openRDP('1.1.1.1/32'); // ability to open RDP Port to CIDR
```

### EKS Compute

The stack creates the Windows Autoscaling group with domain join script and the SSM Documents for gMSA and Global Mapping.

### EKS Cluster

```typescript
const cluster = new WindowsEKSCluster(stack, "ElasticCluster", vpc, "/test") // Creates EKS Cluster with Windows support
```

### EKS Nodes

This stack takes the PersistentStorage stack as input and creates the EKS cluster with permissions to operate EKS clusters.

```typescript
const myNodes = new WindowsEKSNodes( // Creates AutoScaling group for Windows Support
    stack,
    'WindowsEKSNodes',
    vpc,
    new aws_ec2.InstanceType('m5.large'),
  )

myNodes.addAdDependency(secretObject);
myNodes.addStorageDependency(secretObject, storageMount);
myNodes.addEKSDependency(eks_cluster.eksCluster);
myNodes.addLocalCredFile(secretObject, 'myEKSNodes', 'myWebApp');
```
## Skylight-Storage
### FSxWindows 

This construct creates Amazon FSx integrated with Managed AD
Example:

```typescript
const vpc_infrastructure = new FSxWindows(this, "Main-Infra", {
	FSxMBps: 128, 
	FSxSize: 100, 
	MultiAZ: false, 
	FSxInPrivateSubnet: true, 
});
```

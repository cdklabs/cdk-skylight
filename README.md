# What is it?

CDK Skylight is a set of code libraries written with AWS CDK that enables customers to create & provision highly reliable, scalable, and cost-effective applications within the **Microsoft products ecosystem** without worrying about creating and configuring the underlying AWS infrastructure components. *(Such as .NET Workloads, Active Directory, SQL Server, NetApp ONTap).* 

CDK Skylight is set to address repetitive tasks and best practices involved with managing, deploying, and integrating those apps. 

In addition to the complexity of integrating the "aws side" products, Microsoft technologies such as SQL, AD, Windows OS require OS-level integration and optimization. Skylight help in both the "aws-side" and the "os-side," offering a complete end-to-end configuration and integration solution of AWS products. 

Using Skylight libraries, Solutions Architects and Service teams can create sophisticated solutions in the form of code objects. The result is that instead of explaining how to do something, customers can safely consume the constructed solution.

Example:
Today, applications that require Active Directory rely on different teams that handle this part. Therefore, the integration between the application and the Active Directory happens in a dedicated environment. With CDK Skylight, the Active Directory's team owner can provide a custom stack using a pre-defined stack to the teams relying on this Component, allowing the application owner to build the same configuration in the developer account.

## Who should use CDK Skylight?

The primary persona to use CDK Skylight is the infrastructure team owners to customize the stacks and provide them to the application owners teams.

The Active Directory component always comes with DNS topology, and the best practice is to use Route 53 Resolver rules. With CDK Skylight, the infrastructure owner can customize the stack with simple APIs and focus their time and energy on developing features that matter to their business.
## When to use CDK Skylight?

CDK Skylight aims to help in all application lifecycle stages, from the developer’s machine to production environments. According to AWS Well-Architected Framework, the proposed project structure below allows dividing the CI/CD pipelines into call-based architecture.

With CDK Skylight, the time it takes to move between stages and integrate new services is reduced dramatically. In addition, with CDK Skylight, customers can easily encapsulate AWS best practices in their infrastructure definition.

## Proposed Project Structure

A generic application will have Infrastructure and Business Stacks.

In the Infrastructure Stack, we will have the common-used components, such as Authentication, Storage, and Compute layers. Inside each Component, the technical decisions will be made. We want to avoid making technical decisions such as which Storage solution to use, and it can be "Amazon FSx for Windows" or "Amazon FSx for NetApp ONTAP." For example, in the Storage component, we will define the integrations, the parameters, and the methods, allowing us to change the technology if we want to.

![](static/images/screenshots/2022-02-01-19-17-04.png?classes=border,shadow)

For production workloads, we recommend split components to different CloudFormations Stacks, AWS Accounts, and separate CI/CD pipelines, as follows:

![](static/images/screenshots/2022-02-01-19-18-20.png?classes=border,shadow)

Inside each Component, we will make the technical decisions and implementation.

Let's look at the complete application to understand how it will look in practice.
## Example Application

With CDK Skylight, you can build complex integration. As CDK-Skylight libraries are written in decoupled topology, allowing me to choose each Component's technology, in this Example Application, we prefer a very-complex integration: **Windows nodes on EKS with domain-joined machines and SMB with Global-Mapping**.

In this example, the Authentication will use Active Directory, the Compute will be Kubernetes cluster, and the Storage is SMB using Amazon FSx. Here is the whole architecture

![](static/images/screenshots/2022-02-01-19-20-47.png?classes=border,shadow)
## Infrastructure Stack

```typescript
const namespace = '/exampleApp01';
const vpc = new aws_ec2.Vpc(this, 'myVPC');
new AuthenticationComponent(this, 'Auth', namespace, vpc, props);
new StorageComponent(this, 'Storage', namespace, vpc, props);
new ComputeComponent(this, 'Cluster', namespace, vpc, props);
```

## Authentication Component

```typescript
new AdAuthentication(this, 'auth', { // CDK Skylight Library 
	vpc: vpc,
	domainName: 'myDomain.aws',
	namespace: namespace,
});
```

## Storage Component

```typescript
new FSxWindows(this, 'FSx', namespace, { vpc: vpc }); // CDK Skylight Library 
```

## Compute Component

EKS Cluster with EKS Nodes configured with Amazon FSx and Managed AD.

```typescript
const eks_cluster = new WindowsEKSCluster( // CDK Skylight Library 
	this,
	'KubeCluster',
	vpc,
	namespace,
);

const myNodes = new WindowsEKSNodes( // CDK Skylight Library 
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

myNodes.addAdDependency(secretObject); // CDK Skylight Library special methods
myNodes.addStorageDependency(secretObject, storageMount); // CDK Skylight Library special methods
myNodes.addEKSDependency(eks_cluster.eksCluster); // CDK Skylight Library special methods
myNodes.addLocalCredFile(secretObject, 'myEKSNodes', 'myWebApp'); // CDK Skylight Library special methods
```


# CDK Skylight Constructs 

## Skylight-Authentication

Library of Custom Authentication components 

### **AdAuthentication** - Manged Active Directory with R53 Resolvers 

This construct creates Amazon VPC, Amazon Managed AD, Secret for the domain Admin stored in Secrets Manager and Route 53 forward rule for the domain.
The construct provides way to customize configuration and smart defaults for the infrastructures.

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

The stack creates Windows Server with the latest AMI and joined the machine to the domain. It is possible to send Powershell commands or connect and work from the machine. 

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

This stack take the PersistentStorage stack as input and creates the EKS cluster with permissions to operate EKS clusters.

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


# CDK Skylight

CDK Skylight is a set of code libraries written with AWS CDK that enables customers to create, provision highly reliable, highly scalable, cost-effective applications in the cloud without worrying about creating and configuring the underlying AWS infrastructure. 

For example, with CDK Skylight, developers don't need to understand how to integrate Active Directory with Amazon FSx. Instead, they can safely consume a library that handles those parts for them. With CDK Skylight, developers focus their time and energy on developing features that matter to their business.

CDK Skylight helps in all application lifecycle stages, starting from the developer machine to running production workloads. With CDK Skylight, the time it takes to move between stages and integrate new services is reduced dramatically. With CDK Skylight customer can easily encapsulate AWS best practices in their infrastructure definition.


# Usage

Use `npm` to install the module in your CDK project. This will also add it to your package.json file.

```
npm install cdk-skylight
```

```typescript
const vpc_infrastructure = new PersistentStorage(this, 'infraStack', {
    fsxSize: 200,
    fsxMbps: 128,
    multiAZ: true,
    fsxInPrivateSubnet: true,
    domainName: 'cdkskylight.aws',
});
```

To deploy the following integration

![](/static/images/screenshots/2022-01-16-23-26-29.png?classes=border,shadow)

With CDK Skylight you can build complex integration.

# CDK Skylight Constructs 

### **Authentication**

This construct creates Amazon VPC, Amazon Managed AD, Secret for the domain Admin stored in Secrets Manager and Route 53 forward rule for the domain.

The construct provides way to customize configuration and smart defaults for the infrastructures.

Example:

```typescript
const vpc_infrasracture = new Authentication(this, "Main-Infra", { domain_name: "cdkskylight.aws"});
```

### **PersistentStorage**

This construct extends the VpcMad to allow FSx integration.

Example:

```typescript
const vpc_infrastructure = new PersistentStorage(this, "Main-Infra", {
	FSxMBps: 128, 
	FSxSize: 100, 
	MultiAZ: false, 
	FSxInPrivateSubnet: true, 
	domain_name: "cdkskylight.aws"
});
```

### **WindowsEKSCluster** 

This stack take the PersistentStorage stack as input and creates the EKS cluster with permissions to operate EKS clusters.

Example:

```typescript
const eks_infra = new WindowsEKSCluster(this, 'EKS-Infra',vpc_infrastructure);
```

### **WindowsEKSNodes**

The stack creates the Windows Autoscaling group with domain join script and the SSM Documents for gMSA and Global Mapping.

Example:

```typescript
const eks_nodes = new WindowsEKSNodes(this, 'EKS-Nodes',
	vpc_infrastructure, 
	eks_infra);
```

### **RuntimeNode**

The stack creates Windows Server with the latest AMI and joined the machine to the domain. It is possible to send Powershell commands or connect and work from the machine. 

Example:

```typescript
const Worker = new RuntimeNode(this, 'WindowsWorker',{
	vpc: vpc_infrastructure.vpc, 
	madObject: vpc_infrastructure.ad);
```
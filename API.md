# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### AdAuthentication <a name="cdk-skylight.AdAuthentication" id="cdkskylightadauthentication"></a>

#### Initializers <a name="cdk-skylight.AdAuthentication.Initializer" id="cdkskylightadauthenticationinitializer"></a>

```typescript
import { AdAuthentication } from 'cdk-skylight'

new AdAuthentication(scope: Construct, id: string, props: IADAuthenticationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkskylightadauthenticationparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkskylightadauthenticationparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdkskylightadauthenticationparameterprops)<span title="Required">*</span> | [`cdk-skylight.IADAuthenticationProps`](#cdk-skylight.IADAuthenticationProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-skylight.AdAuthentication.parameter.scope" id="cdkskylightadauthenticationparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-skylight.AdAuthentication.parameter.id" id="cdkskylightadauthenticationparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-skylight.AdAuthentication.parameter.props" id="cdkskylightadauthenticationparameterprops"></a>

- *Type:* [`cdk-skylight.IADAuthenticationProps`](#cdk-skylight.IADAuthenticationProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`ad`](#cdkskylightadauthenticationpropertyad)<span title="Required">*</span> | [`aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD`](#aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD) | *No description.* |
| [`secret`](#cdkskylightadauthenticationpropertysecret)<span title="Required">*</span> | [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret) | *No description.* |

---

##### `ad`<sup>Required</sup> <a name="cdk-skylight.AdAuthentication.property.ad" id="cdkskylightadauthenticationpropertyad"></a>

```typescript
public readonly ad: CfnMicrosoftAD;
```

- *Type:* [`aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD`](#aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD)

---

##### `secret`<sup>Required</sup> <a name="cdk-skylight.AdAuthentication.property.secret" id="cdkskylightadauthenticationpropertysecret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---


### FSxWindows <a name="cdk-skylight.FSxWindows" id="cdkskylightfsxwindows"></a>

#### Initializers <a name="cdk-skylight.FSxWindows.Initializer" id="cdkskylightfsxwindowsinitializer"></a>

```typescript
import { FSxWindows } from 'cdk-skylight'

new FSxWindows(scope: Construct, id: string, namespace: string, props: IFSxWindowsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkskylightfsxwindowsparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkskylightfsxwindowsparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`namespace`](#cdkskylightfsxwindowsparameternamespace)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdkskylightfsxwindowsparameterprops)<span title="Required">*</span> | [`cdk-skylight.IFSxWindowsProps`](#cdk-skylight.IFSxWindowsProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.parameter.scope" id="cdkskylightfsxwindowsparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.parameter.id" id="cdkskylightfsxwindowsparameterid"></a>

- *Type:* `string`

---

##### `namespace`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.parameter.namespace" id="cdkskylightfsxwindowsparameternamespace"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.parameter.props" id="cdkskylightfsxwindowsparameterprops"></a>

- *Type:* [`cdk-skylight.IFSxWindowsProps`](#cdk-skylight.IFSxWindowsProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`smbMountAddress`](#cdkskylightfsxwindowssmbmountaddress) | *No description.* |

---

##### `smbMountAddress` <a name="cdk-skylight.FSxWindows.smbMountAddress" id="cdkskylightfsxwindowssmbmountaddress"></a>

```typescript
public smbMountAddress()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`props`](#cdkskylightfsxwindowspropertyprops)<span title="Required">*</span> | [`cdk-skylight.IFSxWindowsProps`](#cdk-skylight.IFSxWindowsProps) | *No description.* |
| [`storageObject`](#cdkskylightfsxwindowspropertystorageobject)<span title="Required">*</span> | [`aws-cdk-lib.aws_fsx.CfnFileSystem`](#aws-cdk-lib.aws_fsx.CfnFileSystem) | *No description.* |

---

##### `props`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.property.props" id="cdkskylightfsxwindowspropertyprops"></a>

```typescript
public readonly props: IFSxWindowsProps;
```

- *Type:* [`cdk-skylight.IFSxWindowsProps`](#cdk-skylight.IFSxWindowsProps)

---

##### `storageObject`<sup>Required</sup> <a name="cdk-skylight.FSxWindows.property.storageObject" id="cdkskylightfsxwindowspropertystorageobject"></a>

```typescript
public readonly storageObject: CfnFileSystem;
```

- *Type:* [`aws-cdk-lib.aws_fsx.CfnFileSystem`](#aws-cdk-lib.aws_fsx.CfnFileSystem)

---


### WindowsEKSCluster <a name="cdk-skylight.WindowsEKSCluster" id="cdkskylightwindowsekscluster"></a>

#### Initializers <a name="cdk-skylight.WindowsEKSCluster.Initializer" id="cdkskylightwindowseksclusterinitializer"></a>

```typescript
import { WindowsEKSCluster } from 'cdk-skylight'

new WindowsEKSCluster(scope: Construct, id: string, vpc: IVpc, namespace: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkskylightwindowseksclusterparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkskylightwindowseksclusterparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`vpc`](#cdkskylightwindowseksclusterparametervpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |
| [`namespace`](#cdkskylightwindowseksclusterparameternamespace)<span title="Required">*</span> | `string` | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.parameter.scope" id="cdkskylightwindowseksclusterparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.parameter.id" id="cdkskylightwindowseksclusterparameterid"></a>

- *Type:* `string`

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.parameter.vpc" id="cdkskylightwindowseksclusterparametervpc"></a>

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---

##### `namespace`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.parameter.namespace" id="cdkskylightwindowseksclusterparameternamespace"></a>

- *Type:* `string`

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`eksCluster`](#cdkskylightwindowseksclusterpropertyekscluster)<span title="Required">*</span> | [`aws-cdk-lib.aws_eks.Cluster`](#aws-cdk-lib.aws_eks.Cluster) | *No description.* |
| [`vpc`](#cdkskylightwindowseksclusterpropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |

---

##### `eksCluster`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.property.eksCluster" id="cdkskylightwindowseksclusterpropertyekscluster"></a>

```typescript
public readonly eksCluster: Cluster;
```

- *Type:* [`aws-cdk-lib.aws_eks.Cluster`](#aws-cdk-lib.aws_eks.Cluster)

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSCluster.property.vpc" id="cdkskylightwindowseksclusterpropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---


### WindowsEKSNodes <a name="cdk-skylight.WindowsEKSNodes" id="cdkskylightwindowseksnodes"></a>

- *Implements:* [`cdk-skylight.IRuntimeNodes`](#cdk-skylight.IRuntimeNodes)

#### Initializers <a name="cdk-skylight.WindowsEKSNodes.Initializer" id="cdkskylightwindowseksnodesinitializer"></a>

```typescript
import { WindowsEKSNodes } from 'cdk-skylight'

new WindowsEKSNodes(scope: Construct, id: string, vpc: IVpc, instanceType: InstanceType)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkskylightwindowseksnodesparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkskylightwindowseksnodesparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`vpc`](#cdkskylightwindowseksnodesparametervpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |
| [`instanceType`](#cdkskylightwindowseksnodesparameterinstancetype)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.InstanceType`](#aws-cdk-lib.aws_ec2.InstanceType) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.scope" id="cdkskylightwindowseksnodesparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.id" id="cdkskylightwindowseksnodesparameterid"></a>

- *Type:* `string`

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.vpc" id="cdkskylightwindowseksnodesparametervpc"></a>

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---

##### `instanceType`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.instanceType" id="cdkskylightwindowseksnodesparameterinstancetype"></a>

- *Type:* [`aws-cdk-lib.aws_ec2.InstanceType`](#aws-cdk-lib.aws_ec2.InstanceType)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`addAdDependency`](#cdkskylightwindowseksnodesaddaddependency) | Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AdAuthentication Object). |
| [`addEKSDependency`](#cdkskylightwindowseksnodesaddeksdependency) | Method to add the nodes to specific Cluster. |
| [`addLocalCredFile`](#cdkskylightwindowseksnodesaddlocalcredfile) | Method to add support for LocalCredFile. |
| [`addStorageDependency`](#cdkskylightwindowseksnodesaddstoragedependency) | Method to configure persistent storage dependency to the hosts. |
| [`addUserData`](#cdkskylightwindowseksnodesadduserdata) | Method to add userData to the nodes. |
| [`runPowerShellSSMDocument`](#cdkskylightwindowseksnodesrunpowershellssmdocument) | *No description.* |

---

##### `addAdDependency` <a name="cdk-skylight.WindowsEKSNodes.addAdDependency" id="cdkskylightwindowseksnodesaddaddependency"></a>

```typescript
public addAdDependency(secret: ISecret)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.secret" id="cdkskylightwindowseksnodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

##### `addEKSDependency` <a name="cdk-skylight.WindowsEKSNodes.addEKSDependency" id="cdkskylightwindowseksnodesaddeksdependency"></a>

```typescript
public addEKSDependency(eksCluster: Cluster)
```

###### `eksCluster`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.eksCluster" id="cdkskylightwindowseksnodesparameterekscluster"></a>

- *Type:* [`aws-cdk-lib.aws_eks.Cluster`](#aws-cdk-lib.aws_eks.Cluster)

---

##### `addLocalCredFile` <a name="cdk-skylight.WindowsEKSNodes.addLocalCredFile" id="cdkskylightwindowseksnodesaddlocalcredfile"></a>

```typescript
public addLocalCredFile(secret: ISecret, ADGroupName: string, AccountName: string)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.secret" id="cdkskylightwindowseksnodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

###### `ADGroupName`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.ADGroupName" id="cdkskylightwindowseksnodesparameteradgroupname"></a>

- *Type:* `string`

---

###### `AccountName`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.AccountName" id="cdkskylightwindowseksnodesparameteraccountname"></a>

- *Type:* `string`

---

##### `addStorageDependency` <a name="cdk-skylight.WindowsEKSNodes.addStorageDependency" id="cdkskylightwindowseksnodesaddstoragedependency"></a>

```typescript
public addStorageDependency(secret: ISecret, storageEndpoint: string)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.secret" id="cdkskylightwindowseksnodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

###### `storageEndpoint`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.storageEndpoint" id="cdkskylightwindowseksnodesparameterstorageendpoint"></a>

- *Type:* `string`

---

##### `addUserData` <a name="cdk-skylight.WindowsEKSNodes.addUserData" id="cdkskylightwindowseksnodesadduserdata"></a>

```typescript
public addUserData(commands: string)
```

###### `commands`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.commands" id="cdkskylightwindowseksnodesparametercommands"></a>

- *Type:* `string`

---

##### `runPowerShellSSMDocument` <a name="cdk-skylight.WindowsEKSNodes.runPowerShellSSMDocument" id="cdkskylightwindowseksnodesrunpowershellssmdocument"></a>

```typescript
public runPowerShellSSMDocument(name: string, commands: string[])
```

###### `name`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.name" id="cdkskylightwindowseksnodesparametername"></a>

- *Type:* `string`

---

###### `commands`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.parameter.commands" id="cdkskylightwindowseksnodesparametercommands"></a>

- *Type:* `string`[]

---


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`asg`](#cdkskylightwindowseksnodespropertyasg)<span title="Required">*</span> | [`aws-cdk-lib.aws_autoscaling.AutoScalingGroup`](#aws-cdk-lib.aws_autoscaling.AutoScalingGroup) | *No description.* |
| [`asgResource`](#cdkskylightwindowseksnodespropertyasgresource)<span title="Required">*</span> | [`aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup`](#aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup) | *No description.* |
| [`windowsWorkersRole`](#cdkskylightwindowseksnodespropertywindowsworkersrole)<span title="Required">*</span> | [`aws-cdk-lib.aws_iam.Role`](#aws-cdk-lib.aws_iam.Role) | *No description.* |

---

##### `asg`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.property.asg" id="cdkskylightwindowseksnodespropertyasg"></a>

```typescript
public readonly asg: AutoScalingGroup;
```

- *Type:* [`aws-cdk-lib.aws_autoscaling.AutoScalingGroup`](#aws-cdk-lib.aws_autoscaling.AutoScalingGroup)

---

##### `asgResource`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.property.asgResource" id="cdkskylightwindowseksnodespropertyasgresource"></a>

```typescript
public readonly asgResource: CfnAutoScalingGroup;
```

- *Type:* [`aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup`](#aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup)

---

##### `windowsWorkersRole`<sup>Required</sup> <a name="cdk-skylight.WindowsEKSNodes.property.windowsWorkersRole" id="cdkskylightwindowseksnodespropertywindowsworkersrole"></a>

```typescript
public readonly windowsWorkersRole: Role;
```

- *Type:* [`aws-cdk-lib.aws_iam.Role`](#aws-cdk-lib.aws_iam.Role)

---


### WindowsNode <a name="cdk-skylight.WindowsNode" id="cdkskylightwindowsnode"></a>

The WindowsNode class.

#### Initializers <a name="cdk-skylight.WindowsNode.Initializer" id="cdkskylightwindowsnodeinitializer"></a>

```typescript
import { WindowsNode } from 'cdk-skylight'

new WindowsNode(scope: Construct, id: string, namespace: string, props: IWindowsNodeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkskylightwindowsnodeparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkskylightwindowsnodeparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`namespace`](#cdkskylightwindowsnodeparameternamespace)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdkskylightwindowsnodeparameterprops)<span title="Required">*</span> | [`cdk-skylight.IWindowsNodeProps`](#cdk-skylight.IWindowsNodeProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.scope" id="cdkskylightwindowsnodeparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.id" id="cdkskylightwindowsnodeparameterid"></a>

- *Type:* `string`

---

##### `namespace`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.namespace" id="cdkskylightwindowsnodeparameternamespace"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.props" id="cdkskylightwindowsnodeparameterprops"></a>

- *Type:* [`cdk-skylight.IWindowsNodeProps`](#cdk-skylight.IWindowsNodeProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`openRDP`](#cdkskylightwindowsnodeopenrdp) | Open the security group of the Node Node to specific IP address on port 3389 i.e: openRDP("1.1.1.1/32"). |
| [`runPsCommands`](#cdkskylightwindowsnoderunpscommands) | Running powershell scripts on the Node with SSM Document. |
| [`runPSwithDomainAdmin`](#cdkskylightwindowsnoderunpswithdomainadmin) | *No description.* |

---

##### `openRDP` <a name="cdk-skylight.WindowsNode.openRDP" id="cdkskylightwindowsnodeopenrdp"></a>

```typescript
public openRDP(ipaddress: string)
```

###### `ipaddress`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.ipaddress" id="cdkskylightwindowsnodeparameteripaddress"></a>

- *Type:* `string`

---

##### `runPsCommands` <a name="cdk-skylight.WindowsNode.runPsCommands" id="cdkskylightwindowsnoderunpscommands"></a>

```typescript
public runPsCommands(psCommands: string[], id: string)
```

###### `psCommands`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.psCommands" id="cdkskylightwindowsnodeparameterpscommands"></a>

- *Type:* `string`[]

---

###### `id`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.id" id="cdkskylightwindowsnodeparameterid"></a>

- *Type:* `string`

---

##### `runPSwithDomainAdmin` <a name="cdk-skylight.WindowsNode.runPSwithDomainAdmin" id="cdkskylightwindowsnoderunpswithdomainadmin"></a>

```typescript
public runPSwithDomainAdmin(psCommands: string[], secret: ISecret, id: string)
```

###### `psCommands`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.psCommands" id="cdkskylightwindowsnodeparameterpscommands"></a>

- *Type:* `string`[]

---

###### `secret`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.secret" id="cdkskylightwindowsnodeparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

###### `id`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.parameter.id" id="cdkskylightwindowsnodeparameterid"></a>

- *Type:* `string`

---


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`instance`](#cdkskylightwindowsnodepropertyinstance)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.Instance`](#aws-cdk-lib.aws_ec2.Instance) | *No description.* |
| [`nodeRole`](#cdkskylightwindowsnodepropertynoderole)<span title="Required">*</span> | [`aws-cdk-lib.aws_iam.Role`](#aws-cdk-lib.aws_iam.Role) | *No description.* |
| [`vpc`](#cdkskylightwindowsnodepropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |

---

##### `instance`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.property.instance" id="cdkskylightwindowsnodepropertyinstance"></a>

```typescript
public readonly instance: Instance;
```

- *Type:* [`aws-cdk-lib.aws_ec2.Instance`](#aws-cdk-lib.aws_ec2.Instance)

---

##### `nodeRole`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.property.nodeRole" id="cdkskylightwindowsnodepropertynoderole"></a>

```typescript
public readonly nodeRole: Role;
```

- *Type:* [`aws-cdk-lib.aws_iam.Role`](#aws-cdk-lib.aws_iam.Role)

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.WindowsNode.property.vpc" id="cdkskylightwindowsnodepropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---




## Protocols <a name="Protocols" id="protocols"></a>

### IADAuthenticationProps <a name="cdk-skylight.IADAuthenticationProps" id="cdkskylightiadauthenticationprops"></a>

- *Implemented By:* [`cdk-skylight.IADAuthenticationProps`](#cdk-skylight.IADAuthenticationProps)

The properties for the AdAuthentication class.


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`namespace`](#cdkskylightiadauthenticationpropspropertynamespace)<span title="Required">*</span> | `string` | The SSM namespace to save parameters to. |
| [`vpc`](#cdkskylightiadauthenticationpropspropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | The VPC to use, must have private subnets. |
| [`domainName`](#cdkskylightiadauthenticationpropspropertydomainname) | `string` | The domain name for the Active Directory Domain. |
| [`edition`](#cdkskylightiadauthenticationpropspropertyedition) | `string` | The edition to use for the Active Directory Domain. |
| [`secret`](#cdkskylightiadauthenticationpropspropertysecret) | [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret) | The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}'. |
| [`secretName`](#cdkskylightiadauthenticationpropspropertysecretname) | `string` | The name of the secret to save once generated or stored. |

---

##### `namespace`<sup>Required</sup> <a name="cdk-skylight.IADAuthenticationProps.property.namespace" id="cdkskylightiadauthenticationpropspropertynamespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* `string`

The SSM namespace to save parameters to.

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.IADAuthenticationProps.property.vpc" id="cdkskylightiadauthenticationpropspropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

The VPC to use, must have private subnets.

---

##### `domainName`<sup>Optional</sup> <a name="cdk-skylight.IADAuthenticationProps.property.domainName" id="cdkskylightiadauthenticationpropspropertydomainname"></a>

```typescript
public readonly domainName: string;
```

- *Type:* `string`
- *Default:* 'domain.aws'.

The domain name for the Active Directory Domain.

---

##### `edition`<sup>Optional</sup> <a name="cdk-skylight.IADAuthenticationProps.property.edition" id="cdkskylightiadauthenticationpropspropertyedition"></a>

```typescript
public readonly edition: string;
```

- *Type:* `string`
- *Default:* 'Standard'.

The edition to use for the Active Directory Domain.

Allowed values: Enterprise | Standard https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-directoryservice-microsoftad.html#cfn-directoryservice-microsoftad-edition

---

##### `secret`<sup>Optional</sup> <a name="cdk-skylight.IADAuthenticationProps.property.secret" id="cdkskylightiadauthenticationpropspropertysecret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)
- *Default:* 'Randomly generated and stored in Secret Manager'.

The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}'.

---

##### `secretName`<sup>Optional</sup> <a name="cdk-skylight.IADAuthenticationProps.property.secretName" id="cdkskylightiadauthenticationpropspropertysecretname"></a>

```typescript
public readonly secretName: string;
```

- *Type:* `string`
- *Default:* 'Domain name + Secret'.

The name of the secret to save once generated or stored.

---

### IFSxWindowsProps <a name="cdk-skylight.IFSxWindowsProps" id="cdkskylightifsxwindowsprops"></a>

- *Implemented By:* [`cdk-skylight.IFSxWindowsProps`](#cdk-skylight.IFSxWindowsProps)

The properties for the PersistentStorage class.


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`vpc`](#cdkskylightifsxwindowspropspropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | The VPC to use, must have private subnets. |
| [`fileSystemInPrivateSubnet`](#cdkskylightifsxwindowspropspropertyfilesysteminprivatesubnet) | `boolean` | Deploy the Amazon FSx file system in private subnet or public subnet See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html. |
| [`fileSystemSize`](#cdkskylightifsxwindowspropspropertyfilesystemsize) | `number` | The Filesystem size in GB. |
| [`multiAZ`](#cdkskylightifsxwindowspropspropertymultiaz) | `boolean` | Choosing Single-AZ or Multi-AZ file system deployment See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html. |
| [`throughputMbps`](#cdkskylightifsxwindowspropspropertythroughputmbps) | `number` | The Filesystem throughput in MBps. |

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.IFSxWindowsProps.property.vpc" id="cdkskylightifsxwindowspropspropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

The VPC to use, must have private subnets.

---

##### `fileSystemInPrivateSubnet`<sup>Optional</sup> <a name="cdk-skylight.IFSxWindowsProps.property.fileSystemInPrivateSubnet" id="cdkskylightifsxwindowspropspropertyfilesysteminprivatesubnet"></a>

```typescript
public readonly fileSystemInPrivateSubnet: boolean;
```

- *Type:* `boolean`
- *Default:* true.

Deploy the Amazon FSx file system in private subnet or public subnet See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html.

---

##### `fileSystemSize`<sup>Optional</sup> <a name="cdk-skylight.IFSxWindowsProps.property.fileSystemSize" id="cdkskylightifsxwindowspropspropertyfilesystemsize"></a>

```typescript
public readonly fileSystemSize: number;
```

- *Type:* `number`
- *Default:* 200.

The Filesystem size in GB.

---

##### `multiAZ`<sup>Optional</sup> <a name="cdk-skylight.IFSxWindowsProps.property.multiAZ" id="cdkskylightifsxwindowspropspropertymultiaz"></a>

```typescript
public readonly multiAZ: boolean;
```

- *Type:* `boolean`
- *Default:* true.

Choosing Single-AZ or Multi-AZ file system deployment See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html.

---

##### `throughputMbps`<sup>Optional</sup> <a name="cdk-skylight.IFSxWindowsProps.property.throughputMbps" id="cdkskylightifsxwindowspropspropertythroughputmbps"></a>

```typescript
public readonly throughputMbps: number;
```

- *Type:* `number`
- *Default:* 128.

The Filesystem throughput in MBps.

---

### IRuntimeNodes <a name="cdk-skylight.IRuntimeNodes" id="cdkskylightiruntimenodes"></a>

- *Implemented By:* [`cdk-skylight.WindowsEKSNodes`](#cdk-skylight.WindowsEKSNodes), [`cdk-skylight.IRuntimeNodes`](#cdk-skylight.IRuntimeNodes)

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`addAdDependency`](#cdkskylightiruntimenodesaddaddependency) | Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AdAuthentication Object). |
| [`addEKSDependency`](#cdkskylightiruntimenodesaddeksdependency) | Method to add the nodes to specific Cluster. |
| [`addLocalCredFile`](#cdkskylightiruntimenodesaddlocalcredfile) | Method to add support for LocalCredFile. |
| [`addStorageDependency`](#cdkskylightiruntimenodesaddstoragedependency) | Method to configure persistent storage dependency to the hosts. |
| [`addUserData`](#cdkskylightiruntimenodesadduserdata) | Method to add userData to the nodes. |

---

##### `addAdDependency` <a name="cdk-skylight.IRuntimeNodes.addAdDependency" id="cdkskylightiruntimenodesaddaddependency"></a>

```typescript
public addAdDependency(secret: ISecret)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.secret" id="cdkskylightiruntimenodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

##### `addEKSDependency` <a name="cdk-skylight.IRuntimeNodes.addEKSDependency" id="cdkskylightiruntimenodesaddeksdependency"></a>

```typescript
public addEKSDependency(eksCluster: Cluster)
```

###### `eksCluster`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.eksCluster" id="cdkskylightiruntimenodesparameterekscluster"></a>

- *Type:* [`aws-cdk-lib.aws_eks.Cluster`](#aws-cdk-lib.aws_eks.Cluster)

---

##### `addLocalCredFile` <a name="cdk-skylight.IRuntimeNodes.addLocalCredFile" id="cdkskylightiruntimenodesaddlocalcredfile"></a>

```typescript
public addLocalCredFile(secret: ISecret, ADGroupName: string, AccountName: string)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.secret" id="cdkskylightiruntimenodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

###### `ADGroupName`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.ADGroupName" id="cdkskylightiruntimenodesparameteradgroupname"></a>

- *Type:* `string`

---

###### `AccountName`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.AccountName" id="cdkskylightiruntimenodesparameteraccountname"></a>

- *Type:* `string`

---

##### `addStorageDependency` <a name="cdk-skylight.IRuntimeNodes.addStorageDependency" id="cdkskylightiruntimenodesaddstoragedependency"></a>

```typescript
public addStorageDependency(secret: ISecret, storageEndpoint: string)
```

###### `secret`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.secret" id="cdkskylightiruntimenodesparametersecret"></a>

- *Type:* [`aws-cdk-lib.aws_secretsmanager.ISecret`](#aws-cdk-lib.aws_secretsmanager.ISecret)

---

###### `storageEndpoint`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.storageEndpoint" id="cdkskylightiruntimenodesparameterstorageendpoint"></a>

- *Type:* `string`

---

##### `addUserData` <a name="cdk-skylight.IRuntimeNodes.addUserData" id="cdkskylightiruntimenodesadduserdata"></a>

```typescript
public addUserData(commands: string)
```

###### `commands`<sup>Required</sup> <a name="cdk-skylight.IRuntimeNodes.parameter.commands" id="cdkskylightiruntimenodesparametercommands"></a>

- *Type:* `string`

---


### IWindowsNodeProps <a name="cdk-skylight.IWindowsNodeProps" id="cdkskylightiwindowsnodeprops"></a>

- *Implemented By:* [`cdk-skylight.IWindowsNodeProps`](#cdk-skylight.IWindowsNodeProps)

The properties for the WindowsNode class.


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`vpc`](#cdkskylightiwindowsnodepropspropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | The VPC to use, must have private subnets. |
| [`amiName`](#cdkskylightiwindowsnodepropspropertyaminame) | `string` | The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex. |
| [`iamManagedPoliciesList`](#cdkskylightiwindowsnodepropspropertyiammanagedpolicieslist) | [`aws-cdk-lib.aws_iam.IManagedPolicy`](#aws-cdk-lib.aws_iam.IManagedPolicy)[] | IAM Instance role permissions. |
| [`instanceType`](#cdkskylightiwindowsnodepropspropertyinstancetype) | `string` | The EC2 Instance type to use. |
| [`usePrivateSubnet`](#cdkskylightiwindowsnodepropspropertyuseprivatesubnet) | `boolean` | Choose if to launch the instance in Private or in Public subnet Private = Subnet that routes to the internet, but not vice versa. |
| [`userData`](#cdkskylightiwindowsnodepropspropertyuserdata) | `string` | UserData string. |

---

##### `vpc`<sup>Required</sup> <a name="cdk-skylight.IWindowsNodeProps.property.vpc" id="cdkskylightiwindowsnodepropspropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

The VPC to use, must have private subnets.

---

##### `amiName`<sup>Optional</sup> <a name="cdk-skylight.IWindowsNodeProps.property.amiName" id="cdkskylightiwindowsnodepropspropertyaminame"></a>

```typescript
public readonly amiName: string;
```

- *Type:* `string`
- *Default:* 'Windows_Server-2022-English-Full'

The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex.

---

##### `iamManagedPoliciesList`<sup>Optional</sup> <a name="cdk-skylight.IWindowsNodeProps.property.iamManagedPoliciesList" id="cdkskylightiwindowsnodepropspropertyiammanagedpolicieslist"></a>

```typescript
public readonly iamManagedPoliciesList: IManagedPolicy[];
```

- *Type:* [`aws-cdk-lib.aws_iam.IManagedPolicy`](#aws-cdk-lib.aws_iam.IManagedPolicy)[]
- *Default:* 'AmazonSSMManagedInstanceCore, AmazonSSMDirectoryServiceAccess'.

IAM Instance role permissions.

---

##### `instanceType`<sup>Optional</sup> <a name="cdk-skylight.IWindowsNodeProps.property.instanceType" id="cdkskylightiwindowsnodepropspropertyinstancetype"></a>

```typescript
public readonly instanceType: string;
```

- *Type:* `string`
- *Default:* 'm5.2xlarge'.

The EC2 Instance type to use.

---

##### `usePrivateSubnet`<sup>Optional</sup> <a name="cdk-skylight.IWindowsNodeProps.property.usePrivateSubnet" id="cdkskylightiwindowsnodepropspropertyuseprivatesubnet"></a>

```typescript
public readonly usePrivateSubnet: boolean;
```

- *Type:* `boolean`
- *Default:* Private.

Choose if to launch the instance in Private or in Public subnet Private = Subnet that routes to the internet, but not vice versa.

Public = Subnet that routes to the internet and vice versa.

---

##### `userData`<sup>Optional</sup> <a name="cdk-skylight.IWindowsNodeProps.property.userData" id="cdkskylightiwindowsnodepropspropertyuserdata"></a>

```typescript
public readonly userData: string;
```

- *Type:* `string`
- *Default:* 'No'

UserData string.

---


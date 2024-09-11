# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AwsManagedMicrosoftAd <a name="AwsManagedMicrosoftAd" id="cdk-skylight.authentication.AwsManagedMicrosoftAd"></a>

A Ad Authentication represents an integration pattern of Managed AD and Route 53 Resolver in a specific VPC.

The Construct creates Managed AD with the provided Secret (Secrets Manager) or generates a new Secret.
The secret saved to SSM parameter store so others can use it with other Constructs (Such as Windows node or FSx)
The provided VPC or the new created VPC will be configured to forward DNS requests to the Managed AD with Route53 Resolvers
The construct also creates (optionally) t3.nano machine that is part of the domain that can be used to run admin-tasks (such as createADGroup)

The createADGroup() method creates an Active Directory permission group in the domain, using the domain admin user.
Please note: When calling createADGroup() API, a Lambda will be created to start the worker machine (Using AWS-SDK),
then each command will be scheduled with State Manager, and the instance will be shut down after complete.

#### Initializers <a name="Initializers" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer"></a>

```typescript
import { authentication } from 'cdk-skylight'

new authentication.AwsManagedMicrosoftAd(scope: Construct, id: string, props: IAwsManagedMicrosoftAdProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.createADGroup">createADGroup</a></code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.createServiceAccount">createServiceAccount</a></code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.createWorker">createWorker</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createADGroup` <a name="createADGroup" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createADGroup"></a>

```typescript
public createADGroup(groupName: string, groupDescription: string): void
```

###### `groupName`<sup>Required</sup> <a name="groupName" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createADGroup.parameter.groupName"></a>

- *Type:* string

---

###### `groupDescription`<sup>Required</sup> <a name="groupDescription" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createADGroup.parameter.groupDescription"></a>

- *Type:* string

---

##### `createServiceAccount` <a name="createServiceAccount" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createServiceAccount"></a>

```typescript
public createServiceAccount(adServiceAccountName: string, servicePrincipalNames: string, principalsAllowedToRetrieveManagedPassword: string): void
```

###### `adServiceAccountName`<sup>Required</sup> <a name="adServiceAccountName" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createServiceAccount.parameter.adServiceAccountName"></a>

- *Type:* string

---

###### `servicePrincipalNames`<sup>Required</sup> <a name="servicePrincipalNames" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createServiceAccount.parameter.servicePrincipalNames"></a>

- *Type:* string

---

###### `principalsAllowedToRetrieveManagedPassword`<sup>Required</sup> <a name="principalsAllowedToRetrieveManagedPassword" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createServiceAccount.parameter.principalsAllowedToRetrieveManagedPassword"></a>

- *Type:* string

---

##### `createWorker` <a name="createWorker" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createWorker"></a>

```typescript
public createWorker(domainName: string, domainPassword: ISecret): DomainWindowsNode
```

###### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createWorker.parameter.domainName"></a>

- *Type:* string

---

###### `domainPassword`<sup>Required</sup> <a name="domainPassword" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.createWorker.parameter.domainPassword"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.isConstruct"></a>

```typescript
import { authentication } from 'cdk-skylight'

authentication.AwsManagedMicrosoftAd.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.adParameters">adParameters</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.microsoftAD">microsoftAD</a></code> | <code>aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.props">props</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdProps</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAd.property.domainWindowsNode">domainWindowsNode</a></code> | <code>cdk-skylight.compute.DomainWindowsNode</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `adParameters`<sup>Required</sup> <a name="adParameters" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.adParameters"></a>

```typescript
public readonly adParameters: IAwsManagedMicrosoftAdParameters;
```

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

##### `microsoftAD`<sup>Required</sup> <a name="microsoftAD" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.microsoftAD"></a>

```typescript
public readonly microsoftAD: CfnMicrosoftAD;
```

- *Type:* aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.props"></a>

```typescript
public readonly props: IAwsManagedMicrosoftAdProps;
```

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdProps

---

##### `secret`<sup>Required</sup> <a name="secret" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `domainWindowsNode`<sup>Optional</sup> <a name="domainWindowsNode" id="cdk-skylight.authentication.AwsManagedMicrosoftAd.property.domainWindowsNode"></a>

```typescript
public readonly domainWindowsNode: DomainWindowsNode;
```

- *Type:* cdk-skylight.compute.DomainWindowsNode

---


### AwsManagedMicrosoftAdR53 <a name="AwsManagedMicrosoftAdR53" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53"></a>

A Ad Authentication represents an integration pattern of Managed AD and Route 53 Resolver in a specific VPC.

The Construct creates Managed AD with the provided Secret (Secrets Manager) or generates a new Secret.
The secret saved to SSM parameter store so others can use it with other Constructs (Such as Windows node or FSx)
The provided VPC or the new created VPC will be configured to forward DNS requests to the Managed AD with Route53 Resolvers
The construct also creates (optionally) t3.nano machine that is part of the domain that can be used to run admin-tasks (such as createADGroup)

The createADGroup() method creates an Active Directory permission group in the domain, using the domain admin user.
Please note: When calling createADGroup() API, a Lambda will be created to start the worker machine (Using AWS-SDK),
then each command will be scheduled with State Manager, and the instance will be shut down after complete.

#### Initializers <a name="Initializers" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer"></a>

```typescript
import { authentication } from 'cdk-skylight'

new authentication.AwsManagedMicrosoftAdR53(scope: Construct, id: string, props: IAwsManagedMicrosoftAdProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createADGroup">createADGroup</a></code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createServiceAccount">createServiceAccount</a></code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createWorker">createWorker</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createADGroup` <a name="createADGroup" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createADGroup"></a>

```typescript
public createADGroup(groupName: string, groupDescription: string): void
```

###### `groupName`<sup>Required</sup> <a name="groupName" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createADGroup.parameter.groupName"></a>

- *Type:* string

---

###### `groupDescription`<sup>Required</sup> <a name="groupDescription" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createADGroup.parameter.groupDescription"></a>

- *Type:* string

---

##### `createServiceAccount` <a name="createServiceAccount" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createServiceAccount"></a>

```typescript
public createServiceAccount(adServiceAccountName: string, servicePrincipalNames: string, principalsAllowedToRetrieveManagedPassword: string): void
```

###### `adServiceAccountName`<sup>Required</sup> <a name="adServiceAccountName" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createServiceAccount.parameter.adServiceAccountName"></a>

- *Type:* string

---

###### `servicePrincipalNames`<sup>Required</sup> <a name="servicePrincipalNames" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createServiceAccount.parameter.servicePrincipalNames"></a>

- *Type:* string

---

###### `principalsAllowedToRetrieveManagedPassword`<sup>Required</sup> <a name="principalsAllowedToRetrieveManagedPassword" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createServiceAccount.parameter.principalsAllowedToRetrieveManagedPassword"></a>

- *Type:* string

---

##### `createWorker` <a name="createWorker" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createWorker"></a>

```typescript
public createWorker(domainName: string, domainPassword: ISecret): DomainWindowsNode
```

###### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createWorker.parameter.domainName"></a>

- *Type:* string

---

###### `domainPassword`<sup>Required</sup> <a name="domainPassword" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.createWorker.parameter.domainPassword"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.isConstruct"></a>

```typescript
import { authentication } from 'cdk-skylight'

authentication.AwsManagedMicrosoftAdR53.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.adParameters">adParameters</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.microsoftAD">microsoftAD</a></code> | <code>aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.props">props</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdProps</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.domainWindowsNode">domainWindowsNode</a></code> | <code>cdk-skylight.compute.DomainWindowsNode</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `adParameters`<sup>Required</sup> <a name="adParameters" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.adParameters"></a>

```typescript
public readonly adParameters: IAwsManagedMicrosoftAdParameters;
```

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

##### `microsoftAD`<sup>Required</sup> <a name="microsoftAD" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.microsoftAD"></a>

```typescript
public readonly microsoftAD: CfnMicrosoftAD;
```

- *Type:* aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.props"></a>

```typescript
public readonly props: IAwsManagedMicrosoftAdProps;
```

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdProps

---

##### `secret`<sup>Required</sup> <a name="secret" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `domainWindowsNode`<sup>Optional</sup> <a name="domainWindowsNode" id="cdk-skylight.authentication.AwsManagedMicrosoftAdR53.property.domainWindowsNode"></a>

```typescript
public readonly domainWindowsNode: DomainWindowsNode;
```

- *Type:* cdk-skylight.compute.DomainWindowsNode

---


### DomainWindowsNode <a name="DomainWindowsNode" id="cdk-skylight.compute.DomainWindowsNode"></a>

A Domain Windows Node represents one Windows EC2 instance configured with Active Directory.

The DomainWindowsNode can be customized to different instance sizes and additional permissions set just like any other EC2 Instance.
You can use this construct to run elevated domain tasks with domain permissions or run your application in a single instance setup.

The machine will be joined to the provided Active Directory domain using a custom CloudFormation bootstrap that will wait until the required reboot to join the domain. Then it will register the machine in SSM and pull tasks from the SSM State manager.

You can send tasks to that machine using the provided methods: runPsCommands() and runPSwithDomainAdmin()

#### Initializers <a name="Initializers" id="cdk-skylight.compute.DomainWindowsNode.Initializer"></a>

```typescript
import { compute } from 'cdk-skylight'

new compute.DomainWindowsNode(scope: Construct, id: string, props: IDomainWindowsNodeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.compute.IDomainWindowsNodeProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.compute.DomainWindowsNode.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.compute.IDomainWindowsNodeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.openRDP">openRDP</a></code> | Open the security group of the Node Node to specific IP address on port 3389 i.e: openRDP("1.1.1.1/32"). |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.runPsCommands">runPsCommands</a></code> | Running PowerShell scripts on the Node with SSM Document. |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.runPSwithDomainAdmin">runPSwithDomainAdmin</a></code> | Running PowerShell scripts on the Node with SSM Document with Domain Admin (Using the Secret used to join the machine to the domain) i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript") The provided psCommands will be stored in C:\Scripts and will be run with scheduled task with Domain Admin rights. |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.runShellCommands">runShellCommands</a></code> | Running bash scripts on the Node with SSM Document. |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.startInstance">startInstance</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-skylight.compute.DomainWindowsNode.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `openRDP` <a name="openRDP" id="cdk-skylight.compute.DomainWindowsNode.openRDP"></a>

```typescript
public openRDP(ipaddress: string): void
```

Open the security group of the Node Node to specific IP address on port 3389 i.e: openRDP("1.1.1.1/32").

###### `ipaddress`<sup>Required</sup> <a name="ipaddress" id="cdk-skylight.compute.DomainWindowsNode.openRDP.parameter.ipaddress"></a>

- *Type:* string

---

##### `runPsCommands` <a name="runPsCommands" id="cdk-skylight.compute.DomainWindowsNode.runPsCommands"></a>

```typescript
public runPsCommands(psCommands: string[], id: string): void
```

Running PowerShell scripts on the Node with SSM Document.

i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript")

###### `psCommands`<sup>Required</sup> <a name="psCommands" id="cdk-skylight.compute.DomainWindowsNode.runPsCommands.parameter.psCommands"></a>

- *Type:* string[]

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.DomainWindowsNode.runPsCommands.parameter.id"></a>

- *Type:* string

---

##### `runPSwithDomainAdmin` <a name="runPSwithDomainAdmin" id="cdk-skylight.compute.DomainWindowsNode.runPSwithDomainAdmin"></a>

```typescript
public runPSwithDomainAdmin(psCommands: string[], id: string): void
```

Running PowerShell scripts on the Node with SSM Document with Domain Admin (Using the Secret used to join the machine to the domain) i.e: runPsCommands(["Write-host 'Hello world'", "Write-host 'Second command'"], "myScript") The provided psCommands will be stored in C:\Scripts and will be run with scheduled task with Domain Admin rights.

###### `psCommands`<sup>Required</sup> <a name="psCommands" id="cdk-skylight.compute.DomainWindowsNode.runPSwithDomainAdmin.parameter.psCommands"></a>

- *Type:* string[]

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.DomainWindowsNode.runPSwithDomainAdmin.parameter.id"></a>

- *Type:* string

---

##### `runShellCommands` <a name="runShellCommands" id="cdk-skylight.compute.DomainWindowsNode.runShellCommands"></a>

```typescript
public runShellCommands(ShellCommands: string[], id: string): void
```

Running bash scripts on the Node with SSM Document.

i.e: runPsCommands(["echo 'hello world'", "echo 'Second command'"], "myScript")

###### `ShellCommands`<sup>Required</sup> <a name="ShellCommands" id="cdk-skylight.compute.DomainWindowsNode.runShellCommands.parameter.ShellCommands"></a>

- *Type:* string[]

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.DomainWindowsNode.runShellCommands.parameter.id"></a>

- *Type:* string

---

##### `startInstance` <a name="startInstance" id="cdk-skylight.compute.DomainWindowsNode.startInstance"></a>

```typescript
public startInstance(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.compute.DomainWindowsNode.isConstruct"></a>

```typescript
import { compute } from 'cdk-skylight'

compute.DomainWindowsNode.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.compute.DomainWindowsNode.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.property.instance">instance</a></code> | <code>aws-cdk-lib.aws_ec2.Instance</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.property.nodeRole">nodeRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.DomainWindowsNode.property.passwordObject">passwordObject</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.compute.DomainWindowsNode.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `instance`<sup>Required</sup> <a name="instance" id="cdk-skylight.compute.DomainWindowsNode.property.instance"></a>

```typescript
public readonly instance: Instance;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance

---

##### `nodeRole`<sup>Required</sup> <a name="nodeRole" id="cdk-skylight.compute.DomainWindowsNode.property.nodeRole"></a>

```typescript
public readonly nodeRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.compute.DomainWindowsNode.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `passwordObject`<sup>Optional</sup> <a name="passwordObject" id="cdk-skylight.compute.DomainWindowsNode.property.passwordObject"></a>

```typescript
public readonly passwordObject: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---


### FSxWindows <a name="FSxWindows" id="cdk-skylight.storage.FSxWindows"></a>

A FSxWindows represents an integration pattern of Amazon FSx and Managed AD in a specific VPC.

The Construct creates Amazon FSx for Windows
The construct also creates (optionally) t3.nano machine that is part of the domain that can be used to run admin-tasks (such as createFolder)

The createFolder() method creates an SMB Folder in the FSx filesystem, using the domain admin user.
Please note: When calling createFolder() API, a Lambda will be created to start the worker machine (Using AWS-SDK),
then each command will be scheduled with State Manager, and the instance will be shut down after complete .

#### Initializers <a name="Initializers" id="cdk-skylight.storage.FSxWindows.Initializer"></a>

```typescript
import { storage } from 'cdk-skylight'

new storage.FSxWindows(scope: Construct, id: string, props: IFSxWindowsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.storage.FSxWindows.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.FSxWindows.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.FSxWindows.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.storage.IFSxWindowsProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.storage.FSxWindows.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.storage.FSxWindows.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.storage.FSxWindows.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.storage.IFSxWindowsProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.storage.FSxWindows.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-skylight.storage.FSxWindows.createFolder">createFolder</a></code> | *No description.* |
| <code><a href="#cdk-skylight.storage.FSxWindows.createWorker">createWorker</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-skylight.storage.FSxWindows.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createFolder` <a name="createFolder" id="cdk-skylight.storage.FSxWindows.createFolder"></a>

```typescript
public createFolder(worker: DomainWindowsNode, folderName: string, secretName: ISecret): void
```

###### `worker`<sup>Required</sup> <a name="worker" id="cdk-skylight.storage.FSxWindows.createFolder.parameter.worker"></a>

- *Type:* cdk-skylight.compute.DomainWindowsNode

---

###### `folderName`<sup>Required</sup> <a name="folderName" id="cdk-skylight.storage.FSxWindows.createFolder.parameter.folderName"></a>

- *Type:* string

---

###### `secretName`<sup>Required</sup> <a name="secretName" id="cdk-skylight.storage.FSxWindows.createFolder.parameter.secretName"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `createWorker` <a name="createWorker" id="cdk-skylight.storage.FSxWindows.createWorker"></a>

```typescript
public createWorker(domainName: string, domainPassword: ISecret): DomainWindowsNode
```

###### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-skylight.storage.FSxWindows.createWorker.parameter.domainName"></a>

- *Type:* string

---

###### `domainPassword`<sup>Required</sup> <a name="domainPassword" id="cdk-skylight.storage.FSxWindows.createWorker.parameter.domainPassword"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.storage.FSxWindows.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.storage.FSxWindows.isConstruct"></a>

```typescript
import { storage } from 'cdk-skylight'

storage.FSxWindows.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.storage.FSxWindows.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.storage.FSxWindows.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.storage.FSxWindows.property.fsxObject">fsxObject</a></code> | <code>aws-cdk-lib.aws_fsx.CfnFileSystem</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.FSxWindows.property.props">props</a></code> | <code>cdk-skylight.storage.IFSxWindowsProps</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.FSxWindows.property.ssmParameters">ssmParameters</a></code> | <code>cdk-skylight.storage.IFSxWindowsParameters</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.storage.FSxWindows.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `fsxObject`<sup>Required</sup> <a name="fsxObject" id="cdk-skylight.storage.FSxWindows.property.fsxObject"></a>

```typescript
public readonly fsxObject: CfnFileSystem;
```

- *Type:* aws-cdk-lib.aws_fsx.CfnFileSystem

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.storage.FSxWindows.property.props"></a>

```typescript
public readonly props: IFSxWindowsProps;
```

- *Type:* cdk-skylight.storage.IFSxWindowsProps

---

##### `ssmParameters`<sup>Required</sup> <a name="ssmParameters" id="cdk-skylight.storage.FSxWindows.property.ssmParameters"></a>

```typescript
public readonly ssmParameters: IFSxWindowsParameters;
```

- *Type:* cdk-skylight.storage.IFSxWindowsParameters

---


### WindowsEKSCluster <a name="WindowsEKSCluster" id="cdk-skylight.compute.WindowsEKSCluster"></a>

#### Initializers <a name="Initializers" id="cdk-skylight.compute.WindowsEKSCluster.Initializer"></a>

```typescript
import { compute } from 'cdk-skylight'

new compute.WindowsEKSCluster(scope: Construct, id: string, props: IWindowsEKSClusterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.compute.IWindowsEKSClusterProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.compute.WindowsEKSCluster.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.compute.IWindowsEKSClusterProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-skylight.compute.WindowsEKSCluster.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.compute.WindowsEKSCluster.isConstruct"></a>

```typescript
import { compute } from 'cdk-skylight'

compute.WindowsEKSCluster.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.compute.WindowsEKSCluster.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.compute.WindowsEKSCluster.property.eksCluster">eksCluster</a></code> | <code>aws-cdk-lib.aws_eks.Cluster</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.compute.WindowsEKSCluster.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `eksCluster`<sup>Required</sup> <a name="eksCluster" id="cdk-skylight.compute.WindowsEKSCluster.property.eksCluster"></a>

```typescript
public readonly eksCluster: Cluster;
```

- *Type:* aws-cdk-lib.aws_eks.Cluster

---


### WindowsEKSNodes <a name="WindowsEKSNodes" id="cdk-skylight.compute.WindowsEKSNodes"></a>

- *Implements:* cdk-skylight.compute.IRuntimeNodes

#### Initializers <a name="Initializers" id="cdk-skylight.compute.WindowsEKSNodes.Initializer"></a>

```typescript
import { compute } from 'cdk-skylight'

new compute.WindowsEKSNodes(scope: Construct, id: string, props: IWindowsEKSNodesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.props">props</a></code> | <code>cdk-skylight.compute.IWindowsEKSNodesProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-skylight.compute.WindowsEKSNodes.Initializer.parameter.props"></a>

- *Type:* cdk-skylight.compute.IWindowsEKSNodesProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.addAdDependency">addAdDependency</a></code> | Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AwsManagedMicrosoftAdR53 Object). |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.addEKSDependency">addEKSDependency</a></code> | Method to add the nodes to specific Cluster. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.addLocalCredFile">addLocalCredFile</a></code> | Method to add support for LocalCredFile <Experimental>. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.addStorageDependency">addStorageDependency</a></code> | Method to configure persistent storage dependency to the hosts by using Global Mapping. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.addUserData">addUserData</a></code> | Method to add userData to the nodes. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall">gMSAWebHookAutoInstall</a></code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.runPowerShellSSMDocument">runPowerShellSSMDocument</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-skylight.compute.WindowsEKSNodes.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAdDependency` <a name="addAdDependency" id="cdk-skylight.compute.WindowsEKSNodes.addAdDependency"></a>

```typescript
public addAdDependency(adParametersStore: IAwsManagedMicrosoftAdParameters): void
```

Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AwsManagedMicrosoftAdR53 Object).

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.WindowsEKSNodes.addAdDependency.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

##### `addEKSDependency` <a name="addEKSDependency" id="cdk-skylight.compute.WindowsEKSNodes.addEKSDependency"></a>

```typescript
public addEKSDependency(eksCluster: Cluster): void
```

Method to add the nodes to specific Cluster.

###### `eksCluster`<sup>Required</sup> <a name="eksCluster" id="cdk-skylight.compute.WindowsEKSNodes.addEKSDependency.parameter.eksCluster"></a>

- *Type:* aws-cdk-lib.aws_eks.Cluster

---

##### `addLocalCredFile` <a name="addLocalCredFile" id="cdk-skylight.compute.WindowsEKSNodes.addLocalCredFile"></a>

```typescript
public addLocalCredFile(adParametersStore: IAwsManagedMicrosoftAdParameters, ADGroupName: string, AccountName: string): void
```

Method to add support for LocalCredFile <Experimental>.

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.WindowsEKSNodes.addLocalCredFile.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

###### `ADGroupName`<sup>Required</sup> <a name="ADGroupName" id="cdk-skylight.compute.WindowsEKSNodes.addLocalCredFile.parameter.ADGroupName"></a>

- *Type:* string

---

###### `AccountName`<sup>Required</sup> <a name="AccountName" id="cdk-skylight.compute.WindowsEKSNodes.addLocalCredFile.parameter.AccountName"></a>

- *Type:* string

---

##### `addStorageDependency` <a name="addStorageDependency" id="cdk-skylight.compute.WindowsEKSNodes.addStorageDependency"></a>

```typescript
public addStorageDependency(adParametersStore: IAwsManagedMicrosoftAdParameters, fsxParametersStore: IFSxWindowsParameters, folderName: string): void
```

Method to configure persistent storage dependency to the hosts by using Global Mapping.

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.WindowsEKSNodes.addStorageDependency.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

###### `fsxParametersStore`<sup>Required</sup> <a name="fsxParametersStore" id="cdk-skylight.compute.WindowsEKSNodes.addStorageDependency.parameter.fsxParametersStore"></a>

- *Type:* cdk-skylight.storage.IFSxWindowsParameters

---

###### `folderName`<sup>Required</sup> <a name="folderName" id="cdk-skylight.compute.WindowsEKSNodes.addStorageDependency.parameter.folderName"></a>

- *Type:* string

---

##### `addUserData` <a name="addUserData" id="cdk-skylight.compute.WindowsEKSNodes.addUserData"></a>

```typescript
public addUserData(commands: ...string[]): void
```

Method to add userData to the nodes.

###### `commands`<sup>Required</sup> <a name="commands" id="cdk-skylight.compute.WindowsEKSNodes.addUserData.parameter.commands"></a>

- *Type:* ...string[]

---

##### `gMSAWebHookAutoInstall` <a name="gMSAWebHookAutoInstall" id="cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall"></a>

```typescript
public gMSAWebHookAutoInstall(eksCluster: Cluster, privateSignerName: string, awsaccountid: string, awsregion: string): void
```

###### `eksCluster`<sup>Required</sup> <a name="eksCluster" id="cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall.parameter.eksCluster"></a>

- *Type:* aws-cdk-lib.aws_eks.Cluster

---

###### `privateSignerName`<sup>Required</sup> <a name="privateSignerName" id="cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall.parameter.privateSignerName"></a>

- *Type:* string

---

###### `awsaccountid`<sup>Required</sup> <a name="awsaccountid" id="cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall.parameter.awsaccountid"></a>

- *Type:* string

---

###### `awsregion`<sup>Required</sup> <a name="awsregion" id="cdk-skylight.compute.WindowsEKSNodes.gMSAWebHookAutoInstall.parameter.awsregion"></a>

- *Type:* string

---

##### `runPowerShellSSMDocument` <a name="runPowerShellSSMDocument" id="cdk-skylight.compute.WindowsEKSNodes.runPowerShellSSMDocument"></a>

```typescript
public runPowerShellSSMDocument(name: string, commands: string[]): void
```

###### `name`<sup>Required</sup> <a name="name" id="cdk-skylight.compute.WindowsEKSNodes.runPowerShellSSMDocument.parameter.name"></a>

- *Type:* string

---

###### `commands`<sup>Required</sup> <a name="commands" id="cdk-skylight.compute.WindowsEKSNodes.runPowerShellSSMDocument.parameter.commands"></a>

- *Type:* string[]

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-skylight.compute.WindowsEKSNodes.isConstruct"></a>

```typescript
import { compute } from 'cdk-skylight'

compute.WindowsEKSNodes.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-skylight.compute.WindowsEKSNodes.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.asg">asg</a></code> | <code>aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.asgResource">asgResource</a></code> | <code>aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.nodesSg">nodesSg</a></code> | <code>aws-cdk-lib.aws_ec2.SecurityGroup</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.WindowsEKSNodes.property.windowsWorkersRole">windowsWorkersRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-skylight.compute.WindowsEKSNodes.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `asg`<sup>Required</sup> <a name="asg" id="cdk-skylight.compute.WindowsEKSNodes.property.asg"></a>

```typescript
public readonly asg: AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

##### `asgResource`<sup>Required</sup> <a name="asgResource" id="cdk-skylight.compute.WindowsEKSNodes.property.asgResource"></a>

```typescript
public readonly asgResource: CfnAutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_autoscaling.CfnAutoScalingGroup

---

##### `nodesSg`<sup>Required</sup> <a name="nodesSg" id="cdk-skylight.compute.WindowsEKSNodes.property.nodesSg"></a>

```typescript
public readonly nodesSg: SecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.SecurityGroup

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.compute.WindowsEKSNodes.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `windowsWorkersRole`<sup>Required</sup> <a name="windowsWorkersRole" id="cdk-skylight.compute.WindowsEKSNodes.property.windowsWorkersRole"></a>

```typescript
public readonly windowsWorkersRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IAwsManagedMicrosoftAdParameters <a name="IAwsManagedMicrosoftAdParameters" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters"></a>

- *Implemented By:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

The properties of an DomainWindowsNodeProps, requires Active Directory parameter to read the Secret to join the domain Default setting: Domain joined, m5.2xlarge, latest windows, Managed by SSM.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.configurationStoreType">configurationStoreType</a></code> | <code>cdk-skylight.authentication.AwsManagedMicrosoftConfigurationStoreType</code> | The name of the Configuration Store Type to use. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.directoryIDPointer">directoryIDPointer</a></code> | <code>string</code> | The name of the SSM Object that contains the Directory ID. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.namespace">namespace</a></code> | <code>string</code> | The SSM namespace to read/write parameters to. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.secretPointer">secretPointer</a></code> | <code>string</code> | The name of the SSM Object that contains the secret name in Secrets Manager. |

---

##### `configurationStoreType`<sup>Optional</sup> <a name="configurationStoreType" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.configurationStoreType"></a>

```typescript
public readonly configurationStoreType: AwsManagedMicrosoftConfigurationStoreType;
```

- *Type:* cdk-skylight.authentication.AwsManagedMicrosoftConfigurationStoreType
- *Default:* 'AWS Systems Manager Parameter Store'.

The name of the Configuration Store Type to use.

---

##### `directoryIDPointer`<sup>Optional</sup> <a name="directoryIDPointer" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.directoryIDPointer"></a>

```typescript
public readonly directoryIDPointer: string;
```

- *Type:* string
- *Default:* 'directoryID'.

The name of the SSM Object that contains the Directory ID.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* 'cdk-skylight'.

The SSM namespace to read/write parameters to.

---

##### `secretPointer`<sup>Optional</sup> <a name="secretPointer" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters.property.secretPointer"></a>

```typescript
public readonly secretPointer: string;
```

- *Type:* string
- *Default:* 'domain-secret'.

The name of the SSM Object that contains the secret name in Secrets Manager.

---

### IAwsManagedMicrosoftAdProps <a name="IAwsManagedMicrosoftAdProps" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps"></a>

- *Implemented By:* cdk-skylight.authentication.IAwsManagedMicrosoftAdProps

The properties for the AwsManagedMicrosoftAd class.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to use, must have private subnets. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.configurationStore">configurationStore</a></code> | <code>cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters</code> | The configuration store to save the directory parameters (After deployed). |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.createWorker">createWorker</a></code> | <code>boolean</code> | Create Domain joined machine to be used to run Powershell commands to that directory. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.domainName">domainName</a></code> | <code>string</code> | The domain name for the Active Directory Domain. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.edition">edition</a></code> | <code>string</code> | The edition to use for the Active Directory Domain. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}'. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.secretName">secretName</a></code> | <code>string</code> | The secret name to save the Domain Admin object. |
| <code><a href="#cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SelectedSubnets</code> | VPC subnet selection, subnets must be private and exactly 2. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to use, must have private subnets.

---

##### `configurationStore`<sup>Optional</sup> <a name="configurationStore" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.configurationStore"></a>

```typescript
public readonly configurationStore: IAwsManagedMicrosoftAdParameters;
```

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

The configuration store to save the directory parameters (After deployed).

---

##### `createWorker`<sup>Optional</sup> <a name="createWorker" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.createWorker"></a>

```typescript
public readonly createWorker: boolean;
```

- *Type:* boolean
- *Default:* 'true'.

Create Domain joined machine to be used to run Powershell commands to that directory.

(i.e Create Ad Group)

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string
- *Default:* 'domain.aws'.

The domain name for the Active Directory Domain.

---

##### `edition`<sup>Optional</sup> <a name="edition" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.edition"></a>

```typescript
public readonly edition: string;
```

- *Type:* string
- *Default:* 'Standard'.

The edition to use for the Active Directory Domain.

Allowed values: Enterprise | Standard
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-directoryservice-microsoftad.html#cfn-directoryservice-microsoftad-edition

---

##### `secret`<sup>Optional</sup> <a name="secret" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret
- *Default:* 'Randomly generated and stored in Secret Manager'.

The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}'.

---

##### `secretName`<sup>Optional</sup> <a name="secretName" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string
- *Default:* '<domain.name>-secret'.

The secret name to save the Domain Admin object.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-skylight.authentication.IAwsManagedMicrosoftAdProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SelectedSubnets;
```

- *Type:* aws-cdk-lib.aws_ec2.SelectedSubnets

VPC subnet selection, subnets must be private and exactly 2.

---

### IDomainWindowsNodeProps <a name="IDomainWindowsNodeProps" id="cdk-skylight.compute.IDomainWindowsNodeProps"></a>

- *Implemented By:* cdk-skylight.compute.IDomainWindowsNodeProps

The properties of an DomainWindowsNodeProps, requires Active Directory parameter to read the Secret to join the domain Default setting: Domain joined, m5.2xlarge, latest windows, Managed by SSM.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to use. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.amiName">amiName</a></code> | <code>string</code> | The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.iamManagedPoliciesList">iamManagedPoliciesList</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy[]</code> | IAM Instance role permissions. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.instanceType">instanceType</a></code> | <code>string</code> | The EC2 Instance type to use. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.passwordObject">passwordObject</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.usePrivateSubnet">usePrivateSubnet</a></code> | <code>boolean</code> | Choose if to launch the instance in Private or in Public subnet Private = Subnet that routes to the internet, but not vice versa. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.userData">userData</a></code> | <code>string</code> | Specific UserData to use. |
| <code><a href="#cdk-skylight.compute.IDomainWindowsNodeProps.property.windowsMachine">windowsMachine</a></code> | <code>boolean</code> | *No description.* |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to use.

---

##### `amiName`<sup>Optional</sup> <a name="amiName" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.amiName"></a>

```typescript
public readonly amiName: string;
```

- *Type:* string
- *Default:* 'Windows_Server-2022-English-Full'

The name of the AMI to search in SSM (ec2.LookupNodeImage) supports Regex.

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---

##### `iamManagedPoliciesList`<sup>Optional</sup> <a name="iamManagedPoliciesList" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.iamManagedPoliciesList"></a>

```typescript
public readonly iamManagedPoliciesList: IManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy[]
- *Default:* 'AmazonSSMManagedInstanceCore, AmazonSSMDirectoryServiceAccess'.

IAM Instance role permissions.

---

##### `instanceType`<sup>Optional</sup> <a name="instanceType" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.instanceType"></a>

```typescript
public readonly instanceType: string;
```

- *Type:* string
- *Default:* 'm5.2xlarge'.

The EC2 Instance type to use.

---

##### `passwordObject`<sup>Optional</sup> <a name="passwordObject" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.passwordObject"></a>

```typescript
public readonly passwordObject: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `usePrivateSubnet`<sup>Optional</sup> <a name="usePrivateSubnet" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.usePrivateSubnet"></a>

```typescript
public readonly usePrivateSubnet: boolean;
```

- *Type:* boolean
- *Default:* Private.

Choose if to launch the instance in Private or in Public subnet Private = Subnet that routes to the internet, but not vice versa.

Public = Subnet that routes to the internet and vice versa.

---

##### `userData`<sup>Optional</sup> <a name="userData" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.userData"></a>

```typescript
public readonly userData: string;
```

- *Type:* string
- *Default:* 'undefined'

Specific UserData to use.

The UserData may still be mutated after creation.

---

##### `windowsMachine`<sup>Optional</sup> <a name="windowsMachine" id="cdk-skylight.compute.IDomainWindowsNodeProps.property.windowsMachine"></a>

```typescript
public readonly windowsMachine: boolean;
```

- *Type:* boolean
- *Default:* 'true'

---

### IFSxWindowsParameters <a name="IFSxWindowsParameters" id="cdk-skylight.storage.IFSxWindowsParameters"></a>

- *Implemented By:* cdk-skylight.storage.IFSxWindowsParameters


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.storage.IFSxWindowsParameters.property.dnsEndpoint">dnsEndpoint</a></code> | <code>string</code> | The name of the parameter to save the FSxEndpoint DNS Endpoint. |
| <code><a href="#cdk-skylight.storage.IFSxWindowsParameters.property.namespace">namespace</a></code> | <code>string</code> | The SSM namespace to read/write parameters to. |

---

##### `dnsEndpoint`<sup>Optional</sup> <a name="dnsEndpoint" id="cdk-skylight.storage.IFSxWindowsParameters.property.dnsEndpoint"></a>

```typescript
public readonly dnsEndpoint: string;
```

- *Type:* string
- *Default:* 'FSxEndpoint-DNS'.

The name of the parameter to save the FSxEndpoint DNS Endpoint.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk-skylight.storage.IFSxWindowsParameters.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* 'cdk-skylight'.

The SSM namespace to read/write parameters to.

---

### IFSxWindowsProps <a name="IFSxWindowsProps" id="cdk-skylight.storage.IFSxWindowsProps"></a>

- *Implemented By:* cdk-skylight.storage.IFSxWindowsProps

The properties for the PersistentStorage class.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.directoryId">directoryId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to use, must have private subnets. |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.fileSystemInPrivateSubnet">fileSystemInPrivateSubnet</a></code> | <code>boolean</code> | Deploy the Amazon FSx file system in private subnet or public subnet See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html. |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.fileSystemSize">fileSystemSize</a></code> | <code>number</code> | The Filesystem size in GB. |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.multiAZ">multiAZ</a></code> | <code>boolean</code> | Choosing Single-AZ or Multi-AZ file system deployment See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html. |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.ssmParameters">ssmParameters</a></code> | <code>cdk-skylight.storage.IFSxWindowsParameters</code> | *No description.* |
| <code><a href="#cdk-skylight.storage.IFSxWindowsProps.property.throughputMbps">throughputMbps</a></code> | <code>number</code> | The Filesystem throughput in MBps. |

---

##### `directoryId`<sup>Required</sup> <a name="directoryId" id="cdk-skylight.storage.IFSxWindowsProps.property.directoryId"></a>

```typescript
public readonly directoryId: string;
```

- *Type:* string

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.storage.IFSxWindowsProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to use, must have private subnets.

---

##### `fileSystemInPrivateSubnet`<sup>Optional</sup> <a name="fileSystemInPrivateSubnet" id="cdk-skylight.storage.IFSxWindowsProps.property.fileSystemInPrivateSubnet"></a>

```typescript
public readonly fileSystemInPrivateSubnet: boolean;
```

- *Type:* boolean
- *Default:* true.

Deploy the Amazon FSx file system in private subnet or public subnet See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html.

---

##### `fileSystemSize`<sup>Optional</sup> <a name="fileSystemSize" id="cdk-skylight.storage.IFSxWindowsProps.property.fileSystemSize"></a>

```typescript
public readonly fileSystemSize: number;
```

- *Type:* number
- *Default:* 200.

The Filesystem size in GB.

---

##### `multiAZ`<sup>Optional</sup> <a name="multiAZ" id="cdk-skylight.storage.IFSxWindowsProps.property.multiAZ"></a>

```typescript
public readonly multiAZ: boolean;
```

- *Type:* boolean
- *Default:* true.

Choosing Single-AZ or Multi-AZ file system deployment See: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html.

---

##### `ssmParameters`<sup>Optional</sup> <a name="ssmParameters" id="cdk-skylight.storage.IFSxWindowsProps.property.ssmParameters"></a>

```typescript
public readonly ssmParameters: IFSxWindowsParameters;
```

- *Type:* cdk-skylight.storage.IFSxWindowsParameters

---

##### `throughputMbps`<sup>Optional</sup> <a name="throughputMbps" id="cdk-skylight.storage.IFSxWindowsProps.property.throughputMbps"></a>

```typescript
public readonly throughputMbps: number;
```

- *Type:* number
- *Default:* 128.

The Filesystem throughput in MBps.

---

### IRuntimeNodes <a name="IRuntimeNodes" id="cdk-skylight.compute.IRuntimeNodes"></a>

- *Implemented By:* cdk-skylight.compute.WindowsEKSNodes, cdk-skylight.compute.IRuntimeNodes

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.compute.IRuntimeNodes.addAdDependency">addAdDependency</a></code> | Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AwsManagedMicrosoftAdR53 Object). |
| <code><a href="#cdk-skylight.compute.IRuntimeNodes.addEKSDependency">addEKSDependency</a></code> | Method to add the nodes to specific Cluster. |
| <code><a href="#cdk-skylight.compute.IRuntimeNodes.addLocalCredFile">addLocalCredFile</a></code> | Method to add support for LocalCredFile <Experimental>. |
| <code><a href="#cdk-skylight.compute.IRuntimeNodes.addStorageDependency">addStorageDependency</a></code> | Method to configure persistent storage dependency to the hosts by using Global Mapping. |
| <code><a href="#cdk-skylight.compute.IRuntimeNodes.addUserData">addUserData</a></code> | Method to add userData to the nodes. |

---

##### `addAdDependency` <a name="addAdDependency" id="cdk-skylight.compute.IRuntimeNodes.addAdDependency"></a>

```typescript
public addAdDependency(adParametersStore: IAwsManagedMicrosoftAdParameters): void
```

Method to configure the Nodes to part of AD Domain Secret: The secrets manager secret to use must be in format: '{Domain: <domain.name>, UserID: 'Admin', Password: '<password>'}' (From cdk-skylight.AwsManagedMicrosoftAdR53 Object).

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.IRuntimeNodes.addAdDependency.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

##### `addEKSDependency` <a name="addEKSDependency" id="cdk-skylight.compute.IRuntimeNodes.addEKSDependency"></a>

```typescript
public addEKSDependency(eksCluster: Cluster): void
```

Method to add the nodes to specific Cluster.

###### `eksCluster`<sup>Required</sup> <a name="eksCluster" id="cdk-skylight.compute.IRuntimeNodes.addEKSDependency.parameter.eksCluster"></a>

- *Type:* aws-cdk-lib.aws_eks.Cluster

---

##### `addLocalCredFile` <a name="addLocalCredFile" id="cdk-skylight.compute.IRuntimeNodes.addLocalCredFile"></a>

```typescript
public addLocalCredFile(adParametersStore: IAwsManagedMicrosoftAdParameters, ADGroupName: string, AccountName: string): void
```

Method to add support for LocalCredFile <Experimental>.

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.IRuntimeNodes.addLocalCredFile.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

###### `ADGroupName`<sup>Required</sup> <a name="ADGroupName" id="cdk-skylight.compute.IRuntimeNodes.addLocalCredFile.parameter.ADGroupName"></a>

- *Type:* string

---

###### `AccountName`<sup>Required</sup> <a name="AccountName" id="cdk-skylight.compute.IRuntimeNodes.addLocalCredFile.parameter.AccountName"></a>

- *Type:* string

---

##### `addStorageDependency` <a name="addStorageDependency" id="cdk-skylight.compute.IRuntimeNodes.addStorageDependency"></a>

```typescript
public addStorageDependency(adParametersStore: IAwsManagedMicrosoftAdParameters, fsxParametersStore: IFSxWindowsParameters, folderName: string): void
```

Method to configure persistent storage dependency to the hosts by using Global Mapping.

###### `adParametersStore`<sup>Required</sup> <a name="adParametersStore" id="cdk-skylight.compute.IRuntimeNodes.addStorageDependency.parameter.adParametersStore"></a>

- *Type:* cdk-skylight.authentication.IAwsManagedMicrosoftAdParameters

---

###### `fsxParametersStore`<sup>Required</sup> <a name="fsxParametersStore" id="cdk-skylight.compute.IRuntimeNodes.addStorageDependency.parameter.fsxParametersStore"></a>

- *Type:* cdk-skylight.storage.IFSxWindowsParameters

---

###### `folderName`<sup>Required</sup> <a name="folderName" id="cdk-skylight.compute.IRuntimeNodes.addStorageDependency.parameter.folderName"></a>

- *Type:* string

---

##### `addUserData` <a name="addUserData" id="cdk-skylight.compute.IRuntimeNodes.addUserData"></a>

```typescript
public addUserData(commands: ...string[]): void
```

Method to add userData to the nodes.

###### `commands`<sup>Required</sup> <a name="commands" id="cdk-skylight.compute.IRuntimeNodes.addUserData.parameter.commands"></a>

- *Type:* ...string[]

---


### IWindowsEKSClusterParameters <a name="IWindowsEKSClusterParameters" id="cdk-skylight.compute.IWindowsEKSClusterParameters"></a>

- *Implemented By:* cdk-skylight.compute.IWindowsEKSClusterParameters


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.IWindowsEKSClusterParameters.property.clusterNamePointer">clusterNamePointer</a></code> | <code>string</code> | The name of the SSM Object that contains the EKS Cluster name. |
| <code><a href="#cdk-skylight.compute.IWindowsEKSClusterParameters.property.namespace">namespace</a></code> | <code>string</code> | The SSM namespace to read/write parameters to. |

---

##### `clusterNamePointer`<sup>Optional</sup> <a name="clusterNamePointer" id="cdk-skylight.compute.IWindowsEKSClusterParameters.property.clusterNamePointer"></a>

```typescript
public readonly clusterNamePointer: string;
```

- *Type:* string
- *Default:* 'windows-eks-cluster-name'.

The name of the SSM Object that contains the EKS Cluster name.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk-skylight.compute.IWindowsEKSClusterParameters.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* 'cdk-skylight/compute/eks'.

The SSM namespace to read/write parameters to.

---

### IWindowsEKSClusterProps <a name="IWindowsEKSClusterProps" id="cdk-skylight.compute.IWindowsEKSClusterProps"></a>

- *Implemented By:* cdk-skylight.compute.IWindowsEKSClusterProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.IWindowsEKSClusterProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.IWindowsEKSClusterProps.property.eksSsmParameters">eksSsmParameters</a></code> | <code>cdk-skylight.compute.IWindowsEKSClusterParameters</code> | The Windows EKS Cluster parameters. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.compute.IWindowsEKSClusterProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `eksSsmParameters`<sup>Optional</sup> <a name="eksSsmParameters" id="cdk-skylight.compute.IWindowsEKSClusterProps.property.eksSsmParameters"></a>

```typescript
public readonly eksSsmParameters: IWindowsEKSClusterParameters;
```

- *Type:* cdk-skylight.compute.IWindowsEKSClusterParameters
- *Default:* 'No default'.

The Windows EKS Cluster parameters.

---

### IWindowsEKSNodesProps <a name="IWindowsEKSNodesProps" id="cdk-skylight.compute.IWindowsEKSNodesProps"></a>

- *Implemented By:* cdk-skylight.compute.IWindowsEKSNodesProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-skylight.compute.IWindowsEKSNodesProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-skylight.compute.IWindowsEKSNodesProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The instance to use. |
| <code><a href="#cdk-skylight.compute.IWindowsEKSNodesProps.property.namespace">namespace</a></code> | <code>string</code> | The SSM namespace to save parameters to. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-skylight.compute.IWindowsEKSNodesProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `instanceType`<sup>Optional</sup> <a name="instanceType" id="cdk-skylight.compute.IWindowsEKSNodesProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType
- *Default:* 'm5.large'.

The instance to use.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk-skylight.compute.IWindowsEKSNodesProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* 'cdk-skylight'.

The SSM namespace to save parameters to.

---

## Enums <a name="Enums" id="Enums"></a>

### AwsManagedMicrosoftConfigurationStoreType <a name="AwsManagedMicrosoftConfigurationStoreType" id="cdk-skylight.authentication.AwsManagedMicrosoftConfigurationStoreType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-skylight.authentication.AwsManagedMicrosoftConfigurationStoreType.SSM">SSM</a></code> | *No description.* |

---

##### `SSM` <a name="SSM" id="cdk-skylight.authentication.AwsManagedMicrosoftConfigurationStoreType.SSM"></a>

---


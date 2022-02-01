import { App, aws_ec2, Stack } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { WindowsEKSCluster, WindowsEKSNodes, WindowsNode } from "../src";

const env = {
	account: "1111111111",
	region: "us-east-1",
};
const app = new App();
const stack = new Stack(app, "test", { env: env });
const vpc = new aws_ec2.Vpc(stack, "vpc", {});

test("Skylight-WindowsNode", () => {
	const windowsNodeObject = new WindowsNode(stack, "WindowsNode", "/test", {
		vpc: vpc,
		userData: "hello",
	});
	windowsNodeObject.runPsCommands(["echo hello world"], "hello");
	windowsNodeObject.runPSwithDomainAdmin(
		["echo hello world"],
		new Secret(stack, "secret"),
		"hello-withPS"
	);
	windowsNodeObject.openRDP("1.1.1.1/32");
	expect(windowsNodeObject).toHaveProperty(
		"instance.instance.cfnResourceType",
		"AWS::EC2::Instance"
	);
});

//EKS
test("Skylight-WindowsEKSNodes", () => {
	const nodes = new WindowsEKSNodes(
		stack,
		"WindowsEKSNodes",
		vpc,
		new aws_ec2.InstanceType("m5.large")
	);
	expect(nodes).toHaveProperty(
		"asgResource.cfnResourceType",
		"AWS::AutoScaling::AutoScalingGroup"
	);
});

test("Skylight-WindowsEKSCluster", () => {
	const cluster = new WindowsEKSCluster(stack, "ElasticCluster", vpc, "/test");
	expect(cluster).toHaveProperty("eksCluster.clusterName");
});

import { App, aws_ec2, Stack } from "aws-cdk-lib";
import { KubeWindowsASG } from "../src";

test("runtimeNodes", () => {
	const env = {
		account: "1111111111",
		region: "us-east-1",
	};
	const app = new App();
	const stack = new Stack(app, "test", { env: env });
	const node = new KubeWindowsASG(
		stack,
		"RuntimeNode",
		new aws_ec2.Vpc(stack, "vpc", {}),
		"/test"
	);
	expect(node).toHaveProperty(
		"asg_resource.cfnResourceType",
		"AWS::AutoScaling::AutoScalingGroup"
	);
});

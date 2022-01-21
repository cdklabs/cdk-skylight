import { App, aws_ec2, Stack } from "aws-cdk-lib";
import { RuntimeNode } from "../src";

test("runtimeNode", () => {
	const env = {
		account: "1111111111",
		region: "us-east-1",
	};
	const app = new App();
	const stack = new Stack(app, "test", { env: env });
	const node = new RuntimeNode(stack, "RuntimeNode", "/test", {
		vpc: new aws_ec2.Vpc(stack, "vpc", {}),
	});
	expect(node).toHaveProperty(
		"instance.instance.cfnResourceType",
		"AWS::EC2::Instance"
	);
});

import { App, aws_ec2, Stack } from "aws-cdk-lib";
import { Authentication, RuntimeNode } from "../src";

test("mad-r53-test", () => {
	const env = {
		account: "1111111111",
		region: "us-east-1",
	};
	const app = new App();
	const stack = new Stack(app, "test", { env: env });
	const mad = new Authentication(stack, "Authentication", {
		vpc: new aws_ec2.Vpc(stack, "myVPC"),
	});

	const node = new RuntimeNode(stack, "RuntimeNode", {
		vpc: mad.vpc,
		secret: mad.secret,
	});
	expect(node).toHaveProperty(
		"instance.instance.cfnResourceType",
		"AWS::EC2::Instance"
	);
});

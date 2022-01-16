import { App, Stack } from "aws-cdk-lib";
import { MadR53, WindowsNode } from "../src";

test("mad-r53-test", () => {
	const env = {
		account: "1111111111",
		region: "us-east-1",
	};
	const app = new App();
	const stack = new Stack(app, "test", { env: env });
	const mad = new MadR53(stack, "MadR53", {});

	const windowsNode = new WindowsNode(stack, "WindowsNode", {
		vpc: mad.vpc,
		secret: mad.secret,
	});
	expect(windowsNode).toHaveProperty(
		"instance.instance.cfnResourceType",
		"AWS::EC2::Instance"
	);
});

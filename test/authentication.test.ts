import { aws_ec2, Stack } from "aws-cdk-lib";
import { Authentication } from "../src";

test("authentication", () => {
	const stack = new Stack();
	const mad = new Authentication(stack, "Authentication", "/test", {
		vpc: new aws_ec2.Vpc(stack, "vpc", {}),
	});
	expect(mad).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(mad).toHaveProperty("secret.physicalName", mad.ad.name + "-secret");
});

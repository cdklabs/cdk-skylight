import { aws_ec2, Stack } from "aws-cdk-lib";
import { Authentication } from "../src";

test("mad-r53-test", () => {
	const stack = new Stack();
	const mad = new Authentication(stack, "Authentication", {
		vpc: new aws_ec2.Vpc(stack, "myVPC"),
	});
	expect(mad).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(mad).toHaveProperty("secret.physicalName", mad.ad.name + "-secret");
});

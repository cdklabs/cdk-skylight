import { Stack } from "aws-cdk-lib";
import { MadR53 } from "../src";

test("mad-r53-test", () => {
	const stack = new Stack();
	const mad = new MadR53(stack, "MadR53", {});
	expect(mad).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(mad).toHaveProperty("secret.physicalName", mad.ad.name + "-secret");
});

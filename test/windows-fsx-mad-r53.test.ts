import { Stack } from "aws-cdk-lib";
import { WindowsFSxMad } from "../src";

test("mad-r53-test", () => {
	const stack = new Stack();
	const fsx_mad = new WindowsFSxMad(stack, "WindowsFSxMad", {});
	expect(fsx_mad).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(fsx_mad).toHaveProperty(
		"secret.physicalName",
		fsx_mad.ad.name + "-secret"
	);
	expect(fsx_mad).toHaveProperty("fsx.cfnResourceType", "AWS::FSx::FileSystem");
});

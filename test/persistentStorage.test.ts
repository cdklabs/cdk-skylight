import { aws_ec2, Stack } from "aws-cdk-lib";
import { Authentication, PersistentStorage } from "../src";

test("storageTest", () => {
	const stack = new Stack();
	const mad = new Authentication(stack, "Authentication", {
		vpc: new aws_ec2.Vpc(stack, "myVPC"),
	});
	const storage = new PersistentStorage(stack, "PersistentStorage", {
		vpc: mad.vpc,
		ad: mad.ad,
	});
	expect(storage).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(storage).toHaveProperty("fsx.cfnResourceType", "AWS::FSx::FileSystem");
});

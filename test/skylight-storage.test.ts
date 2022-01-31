import { aws_ec2, Stack } from "aws-cdk-lib";
// import { PersistentStorage } from "../src";
import { FSxWindows } from "../src";

test("storageTest", () => {
	const stack = new Stack();
	const storage = new FSxWindows(stack, "PersistentStorage", "/test", {
		vpc: new aws_ec2.Vpc(stack, "vpc", {}),
	});
	expect(storage).toHaveProperty(
		"storageObject.cfnResourceType",
		"AWS::FSx::FileSystem"
	);
});

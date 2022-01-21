import { aws_ec2, Stack } from "aws-cdk-lib";
import { PersistentStorage } from "../src";

test("storageTest", () => {
	const stack = new Stack();
	const storage = new PersistentStorage(stack, "PersistentStorage", "/test", {
		vpc: new aws_ec2.Vpc(stack, "vpc", {}),
	});
	expect(storage).toHaveProperty("fsx.cfnResourceType", "AWS::FSx::FileSystem");
});

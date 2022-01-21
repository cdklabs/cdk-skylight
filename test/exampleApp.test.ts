import { App, Stack } from "aws-cdk-lib";
// import { ExampleApp } from "../src/ExampleApp/app";
import { WindowsInfra } from "../src/ExampleApp/infrastructure";

test("ExampleApp", () => {
	const env = {
		account: "1111111111",
		region: "us-east-1",
	};
	const app = new App();
	const stack = new Stack(app, "test", { env: env });
	const node = new WindowsInfra(stack, "infra");
	expect(node).toHaveProperty("node");
});

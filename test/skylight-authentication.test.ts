import { aws_ec2, Stack } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import * as skylight from "../src";

test("authentication", () => {
	const stack = new Stack();
	const mad = new skylight.authentication.AdAuthentication(
		stack,
		"AdAuthentication",
		{
			vpc: new aws_ec2.Vpc(stack, "vpc", {}),
		}
	);
	new skylight.authentication.AdAuthentication(stack, "AdAuthentication2", {
		vpc: new aws_ec2.Vpc(stack, "vpc2", {}),
		edition: "enterprise",
		secret: new Secret(stack, "test-secret"),
		secretName: "custom-secret-name",
	});
	expect(mad).toHaveProperty(
		"ad.cfnResourceType",
		"AWS::DirectoryService::MicrosoftAD"
	);
	expect(mad).toHaveProperty("secret.physicalName", mad.ad.name + "-secret");
});

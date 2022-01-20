import { aws_ec2, Stack } from "aws-cdk-lib";
import { Compute } from "../src";

test("compute-test", () => {
	const stack = new Stack();
	const mad = new Compute(stack, "ElasticCluster", {
		vpc: new aws_ec2.Vpc(stack, "myVPC"),
	});
	expect(mad).toHaveProperty("ekscluster.clusterName");
});

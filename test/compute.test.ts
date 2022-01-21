import { aws_ec2, Stack } from "aws-cdk-lib";
import { KubeCompute } from "../src/compute";

test("compute-test", () => {
	const stack = new Stack();
	const mad = new KubeCompute(
		stack,
		"ElasticCluster",
		new aws_ec2.Vpc(stack, "vpc", {}),
		"/test"
	);
	expect(mad).toHaveProperty("ekscluster.clusterName");
});

/**
 *  Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { aws_ec2 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Authentication } from "../src";
import { KubeCompute } from "../src/compute";
import { FSxWindows } from "../src/persistentStorage";
import { BusinessLogic } from "./businessLogic";

export class WindowsInfra extends Construct {
	constructor(scope: Construct, id: string) {
		super(scope, id);
		const namespace = "/exampleApp01";

		const myVPC = new aws_ec2.Vpc(this, "myVPC", { maxAzs: 2 });

		new Authentication(this, "auth", namespace, {
			vpc: myVPC,
			domainName: "myDomain.aws",
		});
		new FSxWindows(this, "storage", namespace, {
			vpc: myVPC,
		});
		const cluster = new KubeCompute(this, "ComputeCluster", myVPC, namespace);

		const businessLogic = new BusinessLogic(this, "myApp", myVPC, namespace);
		cluster.addPermission(businessLogic.myNodes.windows_workers_role);
		cluster.run(businessLogic.myNodes.asg);
	}
}

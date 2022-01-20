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
import { Compute, PersistentStorage, Authentication, RuntimeNode } from ".";

export class BusinessLogicExample extends Construct {
	constructor(scope: Construct, id: string) {
		super(scope, id);
		const myVPC = new aws_ec2.Vpc(this, "myVPC", { maxAzs: 2 });
		const authentication = new Authentication(this, "auth", {
			vpc: myVPC,
			domainName: "myDomain.aws",
		});
		const storage = new PersistentStorage(this, "storage", {
			vpc: myVPC,
			ad: authentication.ad,
		});
		const cluster = new Compute(this, "ComputeCluster", { vpc: myVPC });
		const myNode = new RuntimeNode(this, "worker1", {
			vpc: myVPC,
			secret: authentication.secret,
			instanceType: "m5.large",
		});
	}
}

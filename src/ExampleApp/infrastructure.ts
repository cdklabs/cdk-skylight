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

import { aws_ec2, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthenticationComponent } from './Components/AuthenticationComponent';
import { ComputeComponent } from './Components/ComputeComponent';
import { StorageComponent } from './Components/StorageComponent';

export class Infrastructure extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const namespace = '/exampleApp01';

    const vpc = new aws_ec2.Vpc(this, 'myVPC');
    new AuthenticationComponent(this, 'Auth', namespace, vpc, props);
    new StorageComponent(this, 'Storage', namespace, vpc, props);
    new ComputeComponent(this, 'Cluster', namespace, vpc, props);
  }
}

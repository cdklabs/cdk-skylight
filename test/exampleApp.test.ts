import { App, Stack } from 'aws-cdk-lib';
// import { ExampleApp } from "../src/ExampleApp/app";
import { Infrastructure } from '../src/ExampleApp/infrastructure';

test('ExampleApp-Infrastructure', () => {
  const env = {
    account: '11111111',
    region: 'us-east-1',
  };
  const app = new App();
  const stack = new Stack(app, 'test', { env: env });
  const node = new Infrastructure(stack, 'infra', { env: env });
  expect(node).toHaveProperty('node');
});

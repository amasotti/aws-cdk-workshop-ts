import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  const hello = new lambda.Function(this, 'HelloLambdaHandler', {
    runtime: lambda.Runtime.NODEJS_16_X, // runtime environment
    code: lambda.Code.fromAsset('lambda'), // code loaded from the lambda directory in this repo
    handler: 'hello.handler' // look into a file called hello.js, take the function called 'handler'
  })

  }
}

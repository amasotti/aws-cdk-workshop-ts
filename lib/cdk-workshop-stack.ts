import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import {HitCounter} from "./hitcounter";


export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function declaration
    const hello = new lambda.Function(this, 'HelloLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X, // runtime environment
      code: lambda.Code.fromAsset('lambda'), // code loaded from the lambda directory in this repo
      handler: 'hello.handler' // look into a file called hello.js, take the function called 'handler'
    })

    const helloCounter = new HitCounter(this, 'HelloLambdaHitCounter', {
      downstream: hello
    })

    // API GATEWAY to make the lambda function accessible from the public internet
    new apigw.LambdaRestApi(this, 'HelloEndpoint', {
      handler: helloCounter.handler,
    })

  }
}

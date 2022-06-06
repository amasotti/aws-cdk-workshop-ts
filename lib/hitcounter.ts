import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";


export interface HitCounterProps {
    /** The target function that should be monitored **/
    downstream: lambda.IFunction
}

export class HitCounter extends Construct {

    public readonly handler: lambda.IFunction;

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        // Define the dynamo DB Table that will be used by the handler
        const table = new dynamo.Table(this, 'Hits', {
            partitionKey: {name: 'path', type: dynamo.AttributeType.STRING}
        });

        this.handler = new lambda.Function(this, 'HitsCounterHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        })

    }
}
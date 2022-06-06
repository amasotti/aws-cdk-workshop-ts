const {DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function(ev)  {
    console.log("Request Infos:", JSON.stringify(ev, undefined, 2));

    const dynamo = new DynamoDB();
    const lambda = new Lambda();

    // Update Dynamo entry for path with the number of hits
    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        Key: {path: { S: ev.path}},
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: {':incr' : {N: '1'}}
    }).promise();


    const response = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(ev,undefined,2)
    }).promise();


    console.log("Downstream Response:", JSON.stringify(response,undefined, 2));

    return JSON.parse(response.Payload)
}
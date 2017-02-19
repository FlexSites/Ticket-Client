'use strict'

const AWS = require('aws-sdk')

/**
 * KinesisConsumer
 *
 * Consumes a DynamoDB stream and pushes the data into an elasticsearch
 * index and into a Kinesis Stream
 */

exports.default = class KinesisConsumer {

}

exports.lambda = (event, context, cb) => {
  // Consume DynamoDB event
}

/**
 * EXAMPLE
 *
 *
{
  "Records": [
    {
      "eventID": "shardId-000000000000:49545115243490985018280067714973144582180062593244200961",
      "eventVersion": "1.0",
      "kinesis": {
        "partitionKey": "partitionKey-3",
        "data": "SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IDEyMy4=",
        "kinesisSchemaVersion": "1.0",
        "sequenceNumber": "49545115243490985018280067714973144582180062593244200961"
      },
      "invokeIdentityArn": identityarn,
      "eventName": "aws:kinesis:record",
      "eventSourceARN": eventsourcearn,
      "eventSource": "aws:kinesis",
      "awsRegion": "us-east-1"
    }
  ]
}
 */

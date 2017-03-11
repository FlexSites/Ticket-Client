'use strict'

const AWS = require('aws-sdk')
const config = require('config')
const Bluebird = require('bluebird')

const dynamodb = new AWS.DynamoDB(config.get('aws.dynamodb'))
let setup = Bluebird.resolve(dynamodb)

// Startup a dynalite server for local testing
if (process.env.NODE_ENV === 'development') {
  const params = config.get('dynalite')
  // Returns a standard Node.js HTTP server
  const dynalite = require('dynalite')
  const dynaliteServer = dynalite(params)

  setup = Bluebird.fromCallback(
    (cb) => dynaliteServer.listen(params.port, cb)
  )
  .then(() => console.info(`Dynalite started on port "${ params.port }"`))
  .return(dynamodb)
}

function setupTable (name, rps = 1, wps = 1, force = false) {
  console.log('called setuptable', name, force)
  return setup
    .then((db) => {
      return db.describeTable({
        TableName: name,
      })
      .promise()
      .then((results) => {
        if (force) {
          console.warn(`Deleting table ${ name }`)
          return db.deleteTable({
            TableName: name,
          })
          .promise()
          .then(() => setupTable(name, rps, wps))
        }
        return results
      })
      .catch((ex) => {
        return createTable(name, rps, wps)
      })
    })
}

function createTable (name, rps = 1, wps = 1) {
  console.info(`Creating table "${ name }"`)
  return setup
    .then((db) => {
      return db.createTable({
        TableName: name,
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
          // {
          //   AttributeName: 'created',
          //   KeyType: 'RANGE',
          // },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
          // {
          //   AttributeName: 'created',
          //   AttributeType: 'S',
          // },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: rps,
          WriteCapacityUnits: wps,
        },
        StreamSpecification: {
          StreamEnabled: true,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
        },
      })
      .promise()
    })
}

exports.default = dynamodb
exports.createTable = createTable
exports.setupTable = setupTable



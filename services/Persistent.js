'use strict'

const EventEmitter = require('events')
const AWS = require('aws-sdk')
const uuid = require('uuid')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

class Service extends EventEmitter {
  constructor (name, viewer, config = {}) {
    super()
    this.name = name
    this.viewer = viewer
    this.config = Object.assign({
      tenant: '',
    }, config)

    this.setup(config, `${ this.config.tenant }${ this.name }`)
  }

  /**
   * GET a list of events optionally filtered by a query
   */
  find (params) {
    return this.db.query()
      .promise()
  }

  /**
   * GET a single event by primary key
   */
  get (id, params) {
    return this.db.get({
      Key: { id },
    }).promise()
  }

  /**
   * POST to create a new event
   * @access booker|manager|owner|admin
   */
  create (data, params) {
    // @todo input validation
    data.id = uuid.v4()
    return this.db.put({
      Item: data,
    }).promise()
  }

  /**
   * PUT to update an event by id
   * @access booker|manager|owner|admin
   */
  update (id, data, params) {
    // @todo input validation
    return this.db.put({
      Item: data,
    }).promise()
  }

  /**
   * PATCH to update an event by id
   * @access booker|manager|owner|admin
   */
  patch (id, data, params) {
    throw new Error(`Method "${ this.name }.patch" is not implemented`)
    // return this.db.update({
    //   Key: { id },
    //   // @todo create UpdateExpression, ConditionExpression from data and params
    //   UpdateExpression: 'set #a = :x + :y',
    //   ConditionExpression: '#a < :MAX',
    //   ExpressionAttributeNames: {'#a': 'Sum'},
    //   ExpressionAttributeValues: {
    //     ':x': 20,
    //     ':y': 45,
    //     ':MAX': 100,
    //   },
    // }).promise()
  }

  /**
   * DELETE an event by ID
   */
  remove (id, params) {
    return this.db.delete({
      Key: { id },
    }).promise()
  }

  /**
   * SETUP database connections
   */
  setup (config, TableName) {
    // Setup code
    this.db = new AWS.DynamoDB.DocumentClient({
      params: { TableName },
      service: dynamodb,
    })
  }
}


exports.default = Service

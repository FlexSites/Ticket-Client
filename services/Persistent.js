'use strict'

const EventEmitter = require('events')
const AWS = require('aws-sdk')
const uuid = require('uuid')
const config = require('config')
const assert = require('assert')
const get = require('lodash.get')

const dynamodb = require('../lib/dynamodb').default
const setupTable = require('../lib/dynamodb').setupTable

class Service extends EventEmitter {
  constructor (name, viewer, _config = {}) {
    super()
    this.name = name
    this.viewer = viewer
    this.config = Object.assign({
      name,
      tenant: '',
      throughput: {
        read: 1,
        write: 1,
      },
    }, _config)

    // Setup code
    assert(name, 'Field "name" is required for database setup.')
    const TableName = `${ config.get('app') }-${ config.get('stage') }-${ name }`
    this.db = new AWS.DynamoDB.DocumentClient({
      params: { TableName },
      service: dynamodb,
    })
  }



  /**
   * GET a list of events optionally filtered by a query
   */
  find (params) {
    // return this.db.query()
    return this.db.scan()
      .promise()
      .then((results) => results.Items)
  }

  /**
   * GET a single event by primary key
   */
  get (id, params) {
    return this.db.get({
      Key: { id },
    })
    .promise()
    .then((results) => {
      console.log(JSON.stringify(results, null, 2))
      if (!results.Item) {
        const err = new Error(`Resource "${ this.name }" with ID "${ id }" not found`)
        err.status = 404
        throw err
      }
      return results.Item
    })
  }

  /**
   * POST to create a new event
   * @access booker|manager|owner|admin
   */
  create (data, params) {
    // @todo input validation
    const id = uuid.v4()
    data.id = id
    data.created = new Date().toISOString()

    return this.db.put({
      Item: data,
    })
    .promise()
    .then(() => this.get(id))
  }

  /**
   * PUT to update an event by id
   * @access booker|manager|owner|admin
   */
  update (id, data, params) {
    // @todo input validation
    return this.db.put({
      Item: data,
    })
    .promise()
    .then(() => this.get(id))
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
    // })
    .promise()
  }

  /**
   * DELETE an event by ID
   */
  remove (id, params) {
    return this.db.delete({
      Key: { id },
    })
    .promise()
    .then(() => ({ id }))
  }

  /**
   * SETUP database connections
   */
  static setup (name, throughput = {}) {
    // Setup code
    assert(name, 'Field "name" is required for database setup.')
    const TableName = `${ config.get('app') }-${ config.get('stage') }-${ name }`
    return setupTable(TableName, throughput.read, throughput.write)
      .return(Service)
  }
}


exports.default = Service

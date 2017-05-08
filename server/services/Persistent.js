'use strict'

const emitter = require('./bus').default
const pluralize = require('pluralize')
const AWS = require('aws-sdk')
const uuid = require('uuid')
const Bluebird = require('bluebird')
const config = require('config')
const assert = require('assert')
const mapValues = require('lodash.mapvalues')
const { fromGlobalId, toGlobalId } = require('graphql-relay')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ticketing')
mongoose.Promise = Bluebird

const dynamodb = require('../lib/dynamodb').default
const setupTable = require('../lib/dynamodb').setupTable

class Model {
  constructor (name, _config = {}) {
    this.name = name
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
    this.db = mongoose.model(name, this.config.model)
  }

  /**
   * GET a list of events optionally filtered by a query
   */
  find (params) {
    // return this.db.query()
    return this.db.find(params)
      .then((results) => results.Items)
      .then(this.toPublicObject.bind(this))
  }

  toPublicObject (obj, nested = false) {
    if (Array.isArray(obj)) {
      return obj.map(this.toPublicObject.bind(this))
    }

    if (obj.id) {
      if (!nested) {
        obj.id = toGlobalId(this.name, obj.id)
      }
    }

    mapValues(obj, (val, key) => {
      if (typeof val === 'object' && !Array.isArray(obj)) {
        return this.toPublicObject(val, true)
      }
      return val
    })

    return obj
  }

  toPrivateObject (obj) {
    if (Array.isArray(obj)) {
      return obj.map(this.toPrivateObject.bind(this))
    }
    console.log(obj)
    obj.id = fromGlobalId(obj.id).id

    return obj
  }

  /**
   * GET a single event by primary key
   */
  get (guid, params) {
    const { id } = fromGlobalId(guid)
    return this.db.findById(id)
    .then((results) => {
      const item = results.Item
      if (!item) {
        const err = new Error(`Resource "${ this.name }" with ID "${ guid }" not found`)
        err.status = 404
        throw err
      }

      return this.toPublicObject(item)
    })
  }

  emit (method) {
    const name = this.name
    return (payload) => {
      emitter.emit(`${ name }:${ method }`, payload)
      return payload
    }
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
    .then(() => this.get(toGlobalId(this.name, id)))
    .then(this.emit('create'))
  }

  /**
   * PUT to update an event by id
   * @access booker|manager|owner|admin
   */
  update (guid, data, params) {
    const { id } = fromGlobalId(guid)
    this.toPrivateObject(data)
    // @todo input validation
    return this.db.put({
      Item: data,
    })
    .then(() => this.get(guid))
    .then(this.emit('update'))
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
    // .promise()
    // .then(this.emit('patch'))
  }

  /**
   * DELETE an event by ID
   */
  remove (guid, params) {
    const { id } = fromGlobalId(guid)
    return this.db.findOneAndRemove({ id })
    .then(() => ({ id: guid }))
    .then(this.emit('remove'))
  }

  /**
   * SETUP database connections
   */
  static setup (name, throughput = {}) {
    // Setup code
    assert(name, 'Field "name" is required for database setup.')
    const TableName = `${ config.get('app') }-${ config.get('stage') }-${ name }`
    return setupTable(TableName, throughput.read, throughput.write)
      .return(Model)
  }
}


exports.default = Model

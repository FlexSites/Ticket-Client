const enjoi = require('enjoi')
const db = require('@nerdsauce/mongo').get('showtime')
const { any } = require('@nerdsauce/auth')
const { BadRequest } = require('http-errors')

const createSchema = require('./create-schema.json')
const updateSchema = require('./update-schema.json')

const authzRemove = any.bind(any, ['remove:showtimes'])
const authzCreate = any.bind(any, ['create:showtimes'])
const authzUpdate = any.bind(any, ['update:showtimes'])

const validate = (schema) => {
  const joi = enjoi(schema)
  return async data => {
    return new Promise((resolve, reject) => {
      return joi.validate(data, { stripUnknown: true }, (err, data) => {
        if (err) return reject(err)
        return resolve(data)
      })
    }).catch(ex => {
      throw new BadRequest(`Invalid input: '${ ex.message }'`)
    })
  }
}

const validateCreate = validate(createSchema)
const validateUpdate = validate(updateSchema)

exports.create = async (viewer, data, ...params) => {
  await authzCreate(viewer.scope)
  // TODO: AuthZ
  // TODO: Input validation
  await validateCreate(data)
  const results = await db.insert(data)
  // TODO: Logging
  // TODO: Eventing
  return results
}

exports.get = async (viewer, _id, ...params) => {
  return db.findOne({ _id }, ...params)
  // TODO: Logging
  // TODO: Eventing
}

exports.query = async (viewer, data = {}, ...params) => {
  return db.find(data, ...params)
  // TODO: Logging
  // TODO: Eventing
}

exports.remove = async (viewer, _id, data = {}, ...params) => {
  await authzRemove(viewer.scope)
  await db.remove({ _id }, ...params)
  return { _id }
  // TODO: Logging
  // TODO: Eventing
}

exports.update = async (viewer, _id, data = {}, ...params) => {
  await authzUpdate(viewer.scope)
  await validateUpdate(data)
  await db.update({ _id }, data, ...params)
  return exports.get(viewer, _id)
  // TODO: Logging
  // TODO: Eventing
}

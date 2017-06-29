const db = require('@nerdsauce/mongo').get('event')
const enjoi = require('enjoi')
const { any } = require('@nerdsauce/auth')
const { promisify } = require('util')

const schema = require('./schema.json')

const joi = enjoi(schema)
const validate = promisify(joi.validate.bind(joi))

const authz = any.bind(any, ['query:events'])

module.exports = async (viewer, data, ...params) => {
  await authz(viewer.scope)
  // TODO: AuthZ
  // TODO: Input validation
  await validate(data)
  const results = await db.insert(data)
  // TODO: Logging
  // TODO: Eventing
  return results
}

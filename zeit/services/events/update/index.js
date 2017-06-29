const { promisify } = require('util')
const db = require('@nerdsauce/mongo').get('event')
const { any } = require('@nerdsauce/auth')
const enjoi = require('enjoi')

const schema = require('./schema.json')

const joi = enjoi(schema)
const authz = any.bind(any, ['create:events'])
const validate = promisify(joi.validate.bind(joi))

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

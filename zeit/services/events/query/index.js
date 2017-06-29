const db = require('@nerdsauce/mongo').get('event')

module.exports = async (viewer, data = {}, ...params) => {
  console.log('query happening', viewer, data)
  return db.find(data, ...params)
  // TODO: Logging
  // TODO: Eventing
}

const { json } = require('micro')
const { graphql } = require('graphql')
const schema = require('./schema')

module.exports = async (req, res) => {
  const body = await json(req)
  console.log('query', body)
  return graphql(schema, body.query, {}, {}, req.variables)
    .then((results) => {
      console.log(results)
      if (Array.isArray(results.errors)) {
        results.errors = results.errors.map((error) => {
          return {
            message: error.message,
            stack: error.stack,
          }
        })
      }
      return results
    })
}

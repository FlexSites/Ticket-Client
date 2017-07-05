const glob = require('glob')
const { join } = require('path')
const { readFileSync } = require('fs')
const { addMockFunctionsToSchema, makeExecutableSchema, MockList } = require('graphql-tools')

const typeDefs = glob
  .sync(join(__dirname, '**/*.graphql'))
  .map((path) => readFileSync(path, 'utf8'))

const mocks = glob
  .sync(join(__dirname, '**/mocks.js'))
  .map(require)

const resolvers = glob
  .sync(join(__dirname, '**/resolvers.js'))
  .map(require)

console.log(glob
  .sync(join(__dirname, '**/*.graphql')))
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: Object.assign({}, ...resolvers),
})

if (process.env.NODE_ENV === 'mock') {
  addMockFunctionsToSchema({
    schema,
    mocks: Object.assign({}, ...mocks),
  })
}

module.exports = schema

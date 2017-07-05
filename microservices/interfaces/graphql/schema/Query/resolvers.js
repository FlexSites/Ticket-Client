const { GraphQLError, Kind } = require('graphql')

module.exports = {
  Currency: {
    __parseValue (value) {
      return value
    },
    __serialize (value) {
      return value
    },
    __parseLiteral (ast) {
      if (ast.kind !== Kind.FLOAT) {
        throw new GraphQLError(`Query error: Can only parse float got a: ${ ast.kind }.`, [ast])
      }

      const parsed = parseFloat(ast.value)
      return parsed
    },
  },
}

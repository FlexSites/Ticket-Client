const { fromGlobalId } = require('graphql-relay')

module.exports = {
  Node: {
    __resolveType (data) {
      const { type } = fromGlobalId(data.id)

      return type
    },
  },
}

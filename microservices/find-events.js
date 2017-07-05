const Service = require('./Service')

const service = new Service('Event', {})

module.exports = viewer => {
  return service.request(viewer).any([]).find({})
}

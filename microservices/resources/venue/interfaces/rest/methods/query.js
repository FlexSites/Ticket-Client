const event = require('../../../service')

module.exports = async (req, res) => {
  return event.query()
}

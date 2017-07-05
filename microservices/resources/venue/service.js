const { query } = require('@ticketing/postgres')
const Service = require('@ticketing/service')

class Venue extends Service {
  async get (viewer, id) {
    const result = await query('SELECT * from venue where id = $1', [ parseInt(id) ])
    if (!result.rows.length) {
      const err = new Error(JSON.stringify({ message: 'Not found' }))
      err.statusCode = 404
      throw err
    }
    return result.rows[0]
  }

  async query (viewer, params) {
    const result = await query('SELECT * from venue')

    return result.rows
  }
}

module.exports = new Venue()

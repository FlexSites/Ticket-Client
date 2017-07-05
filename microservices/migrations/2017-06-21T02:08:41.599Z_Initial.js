const Sequelize = require('sequelize')
const defaultFields = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  tenant_id: {
    type: Sequelize.UUID,
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
}

const metaFields = {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
}

module.exports = {
  up (query) {
    const venue = query.createTable('Venue', Object.assign({}, metaFields, defaultFields))
    const event = query.createTable('Event', Object.assign({}, metaFields, defaultFields))
    const showtime = query.createTable('Showtime', Object.assign({}, defaultFields))
    const ticket = query.createTable('Ticket', Object.assign({}, defaultFields))
    const order = query.createTable('Order', Object.assign({}, defaultFields))

    return Promise.all([ venue, event, showtime, ticket, order ])
  },

  down (query) {
    return query.dropAllTables()
  },
}

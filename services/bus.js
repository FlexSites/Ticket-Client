const EventEmitter = require('events')
exports.default = new EventEmitter()
exports.default.on('event:create', (payload) => {
  console.log('EVENT CREATED', payload);
})
exports.default.on('event:remove', (payload) => {
  console.log('EVENT removeD', payload);
})

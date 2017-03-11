const EventEmitter = require('events')

class Event extends EventEmitter {
  emit (target, payload) {
    console.info('EMIT', target, payload)
    super.emit(target, payload)
  }
}

exports.default = new Event()

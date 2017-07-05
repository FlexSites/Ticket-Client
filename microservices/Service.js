const enjoi = require('enjoi')
const mongoose = require('mongoose')

const mongooseSchema = new mongoose.Schema(
  { created: Date, updated: Date },
  { strict: false }
)

kitty.save(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('meow')
  }
})

module.exports = class Service {
  constructor (name, schema) {
    mongoose.connect(process.env.MONGO_URI)
    this.model = mongoose.model(name, mongooseSchema)
    this.schema = schema
  }

  request (viewer) {
    return new Request(viewer, this.model, this.schema)
  }

  setup (groups) {
    return (app, path) => {}
  }
}

const methods = ['find', 'get', 'create', 'update', 'patch', 'remove']

class Request {
  constructor (viewer, model, schema) {
    this.viewer = viewer
    this.model = model
    this.schema = schema

    methods.forEach(method => {
      this[method] = this.validate(this[method])
    })

    this.validations = []
  }

  any (required) {
    this.validations.push(() => {
      const groups = this.viewer.groups
      const authz = required.some(group => groups.includes(group))
      if (authz) {
        return true
      }
      throw new Error('Unauthorized')
    })

    return this
  }

  all (required) {
    this.validations.push(() => {
      const groups = this.viewer.groups
      const authz = required.every(group => groups.includes(group))
      if (authz) {
        return true
      }
      throw new Error('Unauthorized')
    })

    return this
  }

  validate (fn) {
    return (...args) => {
      const valid = this.validations.every(validation => validation())

      if (valid) {
        return fn.apply(this, args)
      }
    }
  }

  joi (data) {
    const valid = this.schema.validate(data)
    if (!valid) {
      throw new Error('Invalid input')
    }
  }

  find (...params) {
    return this.model.find(...params)
  }
  get (id, ...params) {
    return this.model.findById(id, ...params)
  }
  create (data, ...params) {
    this.joi(data)
    return this.model.create(data, ...params)
  }
  update (id, data, ...params) {
    this.joi(data)
    return this.model.findByIdAndUpdate(id, data, ...params)
  }
  patch (id, data, ...params) {
    this.joi(data)
    return this.model.findByIdAndUpdate(id, data, ...params)
  }
  remove (id, ...params) {
    return this.model.findByIdAndRemove(id, ...params)
  }
}

'use strict'

const Service = require('../service').default

/**
 * Order
 *
 * Intefaces with Stripe API to complete all tasks associated with
 * money
 */

exports.default = class Order extends Service {
  create(viewer, products) {
    throw new Error('Not implemented')
  }
}

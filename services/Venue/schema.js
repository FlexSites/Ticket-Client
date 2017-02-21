'use strict'

const Joi = require('joi')

const venueWrite = Joi.object().keys({
  id: Joi.string().guid(),
  name: Joi.string().required(),
  description: Joi.string().description(),
  address: Joi.object.keys({
    address1: Joi.string().required(), // Street
    address2: Joi.string(), // Suite/Appt. #
    address3: Joi.string(), // Address 3
    region: Joi.string().required(), // State
    locality: Joi.string().required(), // City
    postalCode: Joi.string().required(), // Zip Code
    // geo: [ Joi.float(), Joi.float() ],
  }),
  status: Joi.string(),
})

const seatMap = Joi.object().keys({
  id: Joi.string().guid(),
  venueID: Joi.string().guid().required(),
  name: Joi.string(),
  sections: Joi.array().items(section),
})

const section = Joi.object().keys({
  id: Joi.string().guid(),
  name: Joi.string(),
  rows: Joi.array().items(row),
})

const row = Joi.object().keys({
  id: Joi.string().guid(),
  name: Joi.string(),
  seats: Joi.array().items(seat),
})

const seat = Joi.object().keys({
  id: Joi.string().guid(),
  x: Joi.number().integer().required(),
  name: Joi.string(),
})

exports.venue = venueWrite
exports.seatMap = seatMap

const filters = {
  // Every Wednesday at 7:30 tickets are exactly $5
  '30 19 * * 3': '5',

  // Specifically Feb 12-16 at 7:00, 7:30, 9:00, 9:30 increase ticket prices by $2
  '00,30 19,21 12-16 1 *': '+2',
}



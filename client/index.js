/* eslint no-magic-numbers:"off",no-console:"off" */

'use strict'

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const httpStatus = require('http-status')
const uuid = require('node-uuid')

const showtime = require('./showtime').default

const app = express()
const PORT = process.env.PORT || 5000

const purchases = {}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/admin', (req, res) => res.render('admin/index', { node: { title: 'Dollop' }}))
app.get('/admin/event', (req, res) => res.render('admin/event', { node: { title: 'Dollop' }}))
app.get('/admin/events', (req, res) => res.render('admin/events', { node: { title: 'Dollop' }}))

app.get('/', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.render('index', {
    showtime,
    remaining: showtime.remaining,
  })
})

app.get('/thank-you', (req, res) => {
  res.render('thank-you', { order: purchases[req.query.id] })
})


app.use(bodyParser.json())
app.use(cors())

app.post('/api/reserve', (req, res) => {
  const body = req.body
  const invalidFields = []
  const {
    quantity = 0,
    email,
    name,
  } = req.body
  const id = uuid.v4()

  console.info('body', JSON.stringify(body, null, 2))

  if (!body.name) {
    invalidFields.push({
      field: 'name',
      message: 'Name is required',
    })
  }

  if (!quantity) {
    invalidFields.push({
      field: 'quantity',
      message: 'No quantity requested',
    })
  }

  if (showtime.remaining - quantity < 0) {
    invalidFields.push({
      field: 'quantity',
      message: `Only ${ remaining } tickets remaining.`,
    })
  }

  if (invalidFields.length) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Invalid fields',
      invalidFields,
    })
  }

  showtime.remaining -= body.quantity
  purchases[id] = {
    id,
    name,
    quantity,
    email,
  }

  console.info('remaining', showtime.remaining)
  console.info('purchases', JSON.stringify(purchases, null, 2))

  return res.status(httpStatus.CREATED).send({
    id,
    name,
    quantity,
    email,
  })
})

app.listen(PORT, () => {
  console.info(`Listening on port ${ PORT }`)
})

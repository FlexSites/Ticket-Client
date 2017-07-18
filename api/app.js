const express = require('express')
const config = require('config')
const rest = require('./rest')

const app = express()

const PORT = config.get('port')

app.use('/api/rest', rest)
// app.use('/api/graphql', graphql)

app.use((err, req, res, next) => {
  console.log('worst erro', err)

  res.send(err)
})

app.listen(PORT, (err) => {
  if (err) return console.error(err)
  console.info(`Listening on port "${ PORT }"`)
})

module.exports = app

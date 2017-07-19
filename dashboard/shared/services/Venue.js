const axios = require('axios')

const client = axios.create({
  baseURL: 'http://localhost:3001/api/rest',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${ localStorage.getItem('access_token') }`,
  },
})

function get (id) {
  return client.get(`/venues/${ id }`)
  .then(({ data }) => data)
}

function list () {
  return client.get(`/venues`)
  .then(({ data }) => data)
}

function create (body) {
  return client.post('/venues', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

function update (body) {
  return client.put(`/venues/${ body.id }`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

function remove (id) {
  return client.delete(`/venues/${ id }`)
  .then(({ data }) => data)
}

module.exports = {
  get,
  list,
  create,
  update,
  remove,
}

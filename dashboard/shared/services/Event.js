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
  return client.get(`/events/${ id }`)
  .then(({ data }) => {
    return data || { id, persisted: false }
  })
  .catch((ex) => {
    console.error(ex)
    return { id, persisted: false }
  })
}

function list (venueID = '003d252e-d1e6-40f5-9d22-e330d3f2fb10') {
  return client.get(`/venues/${ venueID }/events`)
  .then(({ data }) => data)
}

function create (body) {
  return client.post('/events', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

function update (body) {
  return client.put(`/events/${ body.id }`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

function remove (id) {
  return client.delete(`/events/${ id }`)
  .then(({ data }) => data)
}

module.exports = {
  get,
  list,
  create,
  update,
  remove,
}

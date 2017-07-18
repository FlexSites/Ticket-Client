import axios from 'axios'
import { auth } from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3001/api/rest',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${ localStorage.getItem('access_token') }`,
  },
})

export function get (id) {
  return client.get(`/events/${ id }`)
  .then(({ data }) => {
    console.log(data)
    return data || { id, persisted: false }
  })
  .catch((ex) => {
    console.error(ex)
    return { id, persisted: false }
  })
}

export function list (venueID = '003d252e-d1e6-40f5-9d22-e330d3f2fb10') {
  return client.get(`/venues/${ venueID }/events`)
  .then(({ data }) => data)
}

export function create (body) {
  return client.post('/events', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

export function update (body) {
  return client.put(`/events/${ body.id }`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

export function remove (id) {
  return client.delete(`/events/${ id }`)
  .then(({ data }) => data)
}

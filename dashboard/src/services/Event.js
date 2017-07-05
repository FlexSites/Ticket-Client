import axios from 'axios'
import { auth } from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3001/api/rest',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${ localStorage.getItem('access_token') }`,
  },
});

export function get (id) {
  return client.get(`/events/${ id }`)
  .then(({ data }) => data)
}

export function list (venueID = '5951e1cde87cb2556e9fb8c4') {
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
  return client.post(`/events/${ body.id }`, body, {
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

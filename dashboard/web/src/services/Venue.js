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
  return client.get(`/venues/${ id }`)
  .then(({ data }) => data)
}

export function list () {
  return client.get(`/venues`)
  .then(({ data }) => data)
}

export function create (body) {
  return client.post('/venues', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

export function update (body) {
  return client.put(`/venues/${ body.id }`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(({ data }) => data)
}

export function remove (id) {
  return client.delete(`/venues/${ id }`)
  .then(({ data }) => data)
}

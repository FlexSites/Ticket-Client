import axios from 'axios'
import querystring from 'querystring'

const API_KEY = 'AIzaSyCMCRdQCnmxf3odiUDrapSD14EY4zBluSg'

export function autocomplete (input) {
  const params = {
    input,
    key: API_KEY,
    type: 'establishment',
  }
  return axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?${ querystring.stringify(params) }`)
    .then((res) => res.data)
}

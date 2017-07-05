const event = {
  // Common
  id: '1234',
  tenant_id: 'wiseguyscomedy',
  created: '2017-06-23T21:01:05Z',
  updated: '2017-06-23T21:01:05Z',

  // Meta
  title: 'Seth Tippetts',
  description: 'Is a tall comedian',

  rating: 'G',

  // Foreign
  venue_id: '5678',
}

const venue = {
  // Common
  id: '1234',
  tenant_id: 'wiseguyscomedy',
  created: '2017-06-23T21:01:05Z',
  updated: '2017-06-23T21:01:05Z',

  // Meta
}

console.log(JSON.stringify(event, null, 2))

module.exports = {
  event,
}

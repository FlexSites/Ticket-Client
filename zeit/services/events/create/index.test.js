const create = require('./index')

test('creates an event', async () => {
  const results = await create({}, { name: 'Seth Tippetts' })
  return expect(results).toEqual({
    _id: expect.any(String),
    name: expect.any(String),
  })
})

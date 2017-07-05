const { promisify } = require('util')
const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const AUTH0_AUDIENCE = 'https://api.evenue.io'
const AUTH0_DOMAIN = 'flexhub.auth0.com'

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${ AUTH0_DOMAIN }/.well-known/jwks.json`,
})

const verify = promisify(jwt.verify.bind(jwt))
const getSigningKey = promisify(client.getSigningKey.bind(client))

module.exports = async req => {
  try {
    const token = req.headers.authorization.replace(/^Bearer/i, '').trim()
    const { kid } = jwt.decode(token, { complete: true }).header
    const { publicKey } = await getSigningKey(kid)
    console.log(token, kid, publicKey)
    return await verify(token, publicKey, {
      audience: AUTH0_AUDIENCE,
      issuer: `https://${ AUTH0_DOMAIN }/`,
      algorithms: ['RS256'],
    })
  } catch (ex) {
    console.log('WHY', ex)
    throw new Unauthorized()
  }
}

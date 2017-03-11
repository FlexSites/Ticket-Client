var jwt = require('express-jwt')
const axios = require('axios')

// var jwtCheck = jwt({
//   secret: 'nVvWiHWWveGceO9Z_jLzpIwRobQ-0WT0HJJsVjFGUre9shEbfkLtj4pbZA9bm5rB',
//   audience: '9cqVEyffPMJwkBOvFG0WykPtf1NZBez3',
// })

exports.default = class User {
  get (id) {

  }

  static fromJwt (jwt) {
    if (!/^Bearer /.test(jwt)) {
      jwt = `Bearer ${ jwt }`
    }
    return axios.get('https://flexhub.auth0.com/userinfo', {
      headers: {
        Authorization: jwt,
      },
    })
    .then((res) => res.data || {})
    .catch((ex) => {
      console.error(ex)
      return {}
    })
  }

  setup() {
    console.info('setup User service');
  }
}

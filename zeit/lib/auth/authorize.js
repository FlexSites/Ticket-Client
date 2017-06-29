const { Forbidden } = require('http-errors')

function groups (method = 'some', expected = [], scopes = []) {
  try {
    if (typeof scopes === 'string') {
      scopes = scopes.split(' ')
    }
    if (expected.length && !expected.some(scope => scopes.includes(scope))) {
      throw new Forbidden()
    }
    return true
  } catch (ex) {
    throw new Forbidden()
  }
}

exports.any = groups.bind(groups, 'some')
exports.all = groups.bind(groups, 'every')

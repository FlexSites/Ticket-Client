const { commerce } = require('faker')

console.log(typeof commerce.price(), 'thing')
module.exports = {
  Currency: () => commerce.price(),
}

const { commerce } = require('faker')

module.exports = {
  Event: () => ({
    priceRange: () => {
      return [ commerce.price(), commerce.price() ]
        .map((price) => parseFloat(price))
        .sort()
        .map((float) => float.toFixed(2))
    },
  }),
}

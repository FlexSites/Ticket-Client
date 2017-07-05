const { address } = require('faker')

module.exports = {
  Address: () => ({
    address1: address.streetAddress(),
    address2: address.secondaryAddress(),
    locality: address.city(),
    region: address.stateAbbr(),
    postalCode: address.zipCode(),
    country: address.countryCode(),
  }),
}

'use strict';

var stripe = Stripe('pk_test_H47OVZI3S4bsjb2K5UWTuRX4');
var elements = stripe.elements();

var card = elements.create('card', {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});
card.mount('#card-element');

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {

    var form = document.querySelector('form');
    var payload = {
      token: result.token,
      quantity: form.querySelector('input[name=quantity]').value,
      name: form.querySelector('input[name=cardholder-name]').value,
      email: form.querySelector('input[name=email]').value,
    }

    var headers = new Headers()
    headers.set('Content-Type', 'application/json')
    // fetch('http://192.168.156.140:5000/api/reserve', {
    fetch('/api/reserve', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(function(obj) {
        console.log(obj);
        window.location.href = `/thank-you?id=${ obj.id }`
      });
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.querySelector('form');
  var extraDetails = {
    quantity: form.querySelector('input[name=quantity]').value,
    name: form.querySelector('input[name=cardholder-name]').value,
    email: form.querySelector('input[name=email]').value,
  };
  stripe.createToken(card, extraDetails).then(setOutcome);
});

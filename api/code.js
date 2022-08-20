import axios from "https://unpkg.com/axios/dist/axios.min.js";
// https://api.coingecko.com/api/v3/exchange_rates
axios.get('https://api.coingecko.com/api/v3/exchange_rates')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
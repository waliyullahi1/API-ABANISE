const axios = require('axios');

function getCurrentTimeInLagos() {
  return axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos')
    .then(response => {
      // Extract the datetime string
      let datetimeString = response.data.datetime;

      // Remove the milliseconds and timezone offset
      datetimeString = datetimeString.split('.')[0];

      // Format the date and time in 24-hour format
      datetimeString = datetimeString.replace('T', ' ');

      // Remove all non-numeric characters
      datetimeString = datetimeString.replace(/\D/g, '');

      return datetimeString;
    })
    .catch(error => {
      console.error(error);
    });
}
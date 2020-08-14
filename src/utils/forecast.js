const request = require('request');

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4382671f0d8a7aa2ded574d7b2ea3682&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, {
        forecast: body.current.weather_descriptions[0],
        temperature: `It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain, the weather is ${body.current.weather_descriptions[0]}`,
        location: `${body.location.name}, ${body.location.country}`
      });
    }
  });
};

module.exports = forecast;

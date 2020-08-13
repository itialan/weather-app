const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGVlc3NhbmciLCJhIjoiY2tkb2Exa2l2MTE5MDJycGp6MWRxNGhnbSJ9.J8j08UDMPRq4ZGmBSl1K_Q`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
        tempature: `It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`
      })
    }
  });
};

module.exports = geocode;

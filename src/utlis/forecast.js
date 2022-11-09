const request = require("request");

function forecast(lat, lng, callback) {
  const url = `http://api.weatherstack.com/current?access_key=759e17cdc1402ebbd2ff58edfcd108b4&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect with weather services!", undefined);
    } else if (body.error) {
      callback("Unable to get weather report. Please try again!", undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        location: `${body.location.region}, ${body.location.country}`,
      });
    }
  });
}

module.exports = forecast;

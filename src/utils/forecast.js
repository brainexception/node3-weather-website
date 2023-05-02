const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const accessKey = 'fd31a8ef2f9f98374ea5cb57b9a99e2f'
  const url = 'http://api.weatherstack.com/current?access_key='+accessKey+'&query='+latitude+','+longitude
  console.log(url)
  request({ url, json: true }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out. There is a ${body.current.precip * 100}% chance of rain.`)
    }
  })
}

module.exports = forecast
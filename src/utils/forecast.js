const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=YOURTOKENHERE&query=' + latitude + ', ' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weatherdescription: body.current.weather_descriptions[0],
                wind_speed: body.current.wind_speed,
                wind_dir: body.current.wind_dir,
                pressure: body.current.pressure
            })
        }
    })
}

module.exports = forecast 
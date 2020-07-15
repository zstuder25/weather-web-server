const request = require('postman-request')
const PropertiesReader = require('properties-reader')
const prop = PropertiesReader('./app.properties')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ prop.get('weather_stack.access_key')
        +'&query='+ lat + ','+ long +'&units=f'
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
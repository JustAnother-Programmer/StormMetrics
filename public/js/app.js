const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weathericon = document.querySelector('#weathericon')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    weathericon.src = ''
    messageOne.textContent = 'Fetching weather data...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                weathericon.src = data.weathericon
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Current Weather: ' + data.weatherdescription
                messageThree.textContent = 'Temperature: ' + data.temperature + ' °C'
                messageFour.textContent = 'Feels like: ' + data.feelslike + ' °C'
                messageFive.textContent = 'Wind speed: ' + data.wind_speed + ' Km/h' + ' Wind Direction: ' + data.wind_dir
                messageSix.textContent = 'Pressure: ' + data.pressure + ' Milibar'
            }
        })
    })
})
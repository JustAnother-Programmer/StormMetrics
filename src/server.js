const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const templatesDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templatesDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome',
        author: 'JustAnotherProgrammer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'JustAnotherProgrammer'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Location Must be provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=> {
        if(error){
            return res.send({
                error: 'Something went wrong! ' + error
            })
        }
        
        forecast(latitude, longitude, (error, { temperature, feelslike, weatherdescription, wind_speed, wind_dir, pressure, weathericon } = {}) => {
            if(error){
                return res.send({
                    error: 'Something went wrong! ' + error 
                })
            }
            
            return res.send({
                address: req.query.address,
                weathericon,
                location,
                temperature,
                feelslike,
                weatherdescription,
                wind_speed,
                wind_dir,
                pressure
            })
        })
    })
})

app.get('/test', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)
    res.send({
        test: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Requested page was not found on server, if you believe this is an error contact site administrator.'
    })
})

app.listen(port, () => {
    console.log('Server Started! Using port ' + port + '...')
})
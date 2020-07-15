const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zach'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zach'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About Me',
        name: 'Zach',
        message: "Help me!"
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'stuff',
        location: 'Columbus'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Zach',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Zach',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
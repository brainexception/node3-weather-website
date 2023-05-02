const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        title:'Help',
        name: 'Andew Mead Help'
    })
    
})

app.get('/products', (req,res) => {
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
      } = {}) => {
        if (error) {
            console.log('Error in geo code')
          return res.send({
            error
          })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error
            })
          }
    
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        })
      })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
     res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
     })
})

// app.get('/about', (req, res)=> {
//     res.send({
//         name:'Andrew',
//         age:'18'
//     })
// })



// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


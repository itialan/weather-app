const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home page',
    name: 'Quang Hoa'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Quang Hoa'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is a message page',
    name: 'Quang Hoa'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide a search term!' });
  }

  forecast(req.query.address, (error, { forecast, location, temperature } = {}) => {
    if (error) {
      return res.send({ error });
    } 

    res.send({
      forecast: forecast,
      temperature: temperature,
      location: location,
      address: req.query.address
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help',
    error: 'Help article not found',
    name: 'Quang Hoa'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '*',
    error: 'Page not found',
    name: 'Quang Hoa'
  });
});

app.listen(port, () => {
  console.log(`This server is up in port ${port}`);
});



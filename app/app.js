const express = require('express');
const bodyParser = require('body-parser');
const Provider = require('./routes/user')

const App = express()

// Accept json format
App.use(bodyParser.json())
// Request only json
App.use(bodyParser.urlencoded({extended:false}))
// Set URL to provider
App.use('/user', Provider)

module.exports = App
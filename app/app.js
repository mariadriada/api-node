const express = require('express');
const bodyParser = require('body-parser');
const User = require('./routes/user')
const Order = require('./routes/order')
const Operation = require('./routes/operation')
const App = express()

// Accept json format
App.use(bodyParser.json())
// Request only json
App.use(bodyParser.urlencoded({extended:false}))
// Set URL to user
App.use('/users', User)
// Set URL to order
App.use('/orders', Order)
// Set URL to operation
App.use('/tasks', Operation)

module.exports = App
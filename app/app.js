const express = require('express');
const bodyParser = require('body-parser');

const App = express()

// Accept json format
App.use(bodyParser.json())
// Request only json
App.use(bodyParser.urlencoded({extended:false}))

module.exports = App
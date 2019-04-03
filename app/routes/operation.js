const express = require('express')
const OperationCtr = require('../controllers/OperationsController')


const Router = express.Router()

Router
    // Get task list of driver
    .get('/', OperationCtr.getTaskDriver)   


module.exports = Router
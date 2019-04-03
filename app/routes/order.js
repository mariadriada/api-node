const express = require('express')
const OrderCtr = require('../controllers/OrdersController')
const OperationCtr = require('../controllers/OperationsController')
const Router = express.Router()

Router
    // Get all orders
    .get('/', OrderCtr.getAll)

    // Find user(s) for a specific field
    .get('/:key/:value',    OrderCtr.find,  
                            OrderCtr.getForField) 
    //Create one new order
    .post('/', OrderCtr.create, OperationCtr.assignRandomDriver) 

    // Update order
    .put('/:key/:value',    OrderCtr.find, 
                            OrderCtr.update)
    //Delete one order
    .delete('/:key/:value', OrderCtr.find, 
                            OrderCtr.remove)  
                             
module.exports = Router
const express = require('express')
const OrderCtr = require('../controllers/OrdersController')


const Router = express.Router()

Router
    // Get all users
    .get('/', OrderCtr.getAll)

    // Find user(s) for a specific field
    .get('/:key/:value',    OrderCtr.find,  
                            OrderCtr.getForField) 
    //Create a new user
    .post('/', OrderCtr.create) 

    // Update users
    .put('/:key/:value',    OrderCtr.find, 
                            OrderCtr.update)
    //Delete a uer
    .delete('/:key/:value', OrderCtr.find, 
                            OrderCtr.remove) 
    

module.exports = Router
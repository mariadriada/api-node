const express = require('express')
const UserCtr = require('../controllers/UsersController')
const Router = express.Router()

Router
    // Get all users
    .get('/', UserCtr.getAll)

    // Find user(s) for a specific field
    .get('/:key/:value',    UserCtr.find,  
                            UserCtr.getForField) 
    //Create a new user
    .post('/', UserCtr.create) 

    // Update users
    .put('/:key/:value',    UserCtr.find, 
                            UserCtr.update)
    //Delete a uer
    .delete('/:key/:value', UserCtr.find, 
                            UserCtr.remove)    

module.exports = Router
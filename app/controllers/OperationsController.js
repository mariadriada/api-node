/*
* Module to do specific operations with orders
*/

const Order = require('../models/Orders')
const Database = require('../config/database')

// List of active drivers
let drivers = [
    'InspectOrderCtr1',
    'InspectOrderCtr2',
    'InspectOrderCtr3',
    'InspectOrderCtr4'
]

// Generate aleatory driver and assigned to order to be save
function assignRandomDriver(req, res) {
   
    //Min index for drivers array
    const min = 0;
    //Max index for drivers array
    const max = drivers.length;  

    //Generate random number for index to driver
    randomIndex = (Math.floor(Math.random() * (max - min)) + min )   
    //Assign aleatory driver to field respective
    req.body.order.driver = drivers[randomIndex]
    //Insert order and database
    req.body.order.save()
        .then(order => res.status(200).send({message: 'Order created and assigned driver', order}))
        .catch(error => res.status(500).send({error}))      
}

// Endpoint to return list of task to driver
async function getTaskDriver(req, res) {

    Database.connect();

    //Find orders to driver and date requested
    await Order.find(req.body)
    .then((tasks) => {
        if (tasks.length) return res.status(200).send(tasks)        
        return res.status(204).send('NO CONTENT')        
    })
    .catch(error => res.status(500).send(error))

    // close the database connection
    Database.close()     
   
}


module.exports = {
    assignRandomDriver,
    getTaskDriver
}
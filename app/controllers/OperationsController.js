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
async function assignRandomDriver(req, res) {      
    
    Database.connect();

    //Min index for drivers array
    const min = 0;
    //Max index for drivers array
    const max = drivers.length;  

    //Generate random number for index to driver
    randomIndex = (Math.floor(Math.random() * (max - min)) + min )   
    //Assign aleatory driver to field respective
    req.body.orders.driver = drivers[randomIndex]
    //Insert order and database
    await req.body.orders.save()
        .then(order => res.status(200).send({message: 'Order created and assigned driver', order}))
        .catch(error => res.status(500).send({error})) 
    
    // When finish transaction close the database connection
    Database.close() 
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

// Validate time slot between 1 and 8 hours
function validateTimeSlot(req, res, next) {

    let time = []

    //If is a new order
    if (req.method === 'POST')
    time = req.body.orders.time_slot.split('-')
    //If is an updating
    else if (req.method === 'PUT') {
        if (req.body.time_slot === undefined) return next()
        time = req.body.time_slot.split('-') 
    }
      
    //Validate hours
    if (time.length === 2) {        
        const t1 = parseInt(time[1])
        const t0 = parseInt(time[0])  

        // validate format 
        if ((isNaN(t1) || (isNaN(t0))))
        res.status(409).send({message: 'Incorrect format to time_slot, must be: h-h. h=number between 0 and 24 hours'})    

        // If time is correct
        if (( t1-t0 >= 1) && (t1-t0 <= 8))     
        next()  
        else
        res.status(409).send({message: 'Time slot must be between 1 and 8 hours'}) 
    }     
}

module.exports = {
    assignRandomDriver,
    getTaskDriver,
    validateTimeSlot
}
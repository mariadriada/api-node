/*
* CRUD Orders controller 
*/

const Order = require('../models/Orders')
const Database = require('../config/database')


// Find all orders
async function getAll(req, res) {    
    Database.connect();

    await Order.find().populate('user').exec()
    .then(orders => {  
        if (orders.length) return res.status(200).send(orders)        
        return res.status(204).send('NO CONTENT')
    }).catch(error => res.status(500).send(error))
    
    // When data is transfer it close the database connection
    Database.close()        
}

// Find order(s) for a specific field
function getForField(req, res) {   
    // close the database connection
    Database.close()     
   
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})    
    if(!req.body.orders) return res.status(404).send({message: 'NOT FOUND'})
    let orders = req.body.orders
    return res.status(200).send({orders})   
}

// Create a order
function create(req, res, next) {
    let orders = new Order(req.body)     
    req.body.orders = orders
    // Send to generate aleatory driver and save order
    next() 
}

// Update data order
async function update(req, res) {
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.orders) return res.status(404).send({message: 'NOT FOUND'})

    let order = req.body.orders[0]
    order = Object.assign(order, req.body)
    await order.save()
        .then(order => res.status(200).send({message: 'UPDATED', order}))
        .catch(error => res.status(500).send({error}))

    // close the database connection
    Database.close() 
}

//Delete one order
async function remove(req, res) {   
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})   
    if(!req.body.orders) return res.status(404).send({message: 'NOT FOUND'})
    
    // Delete the first item
    await req.body.orders[0].remove()    
        .then(order => res.status(200).send({message: 'REMOVED', order}))
        .catch(error => res.status(500).send({error}))
        
    // When order is deleted it close the database connection
    Database.close()  
}

// Middleware
function find(req, res, next) {
    let query = {}
    query[req.params.key] = req.params.value

    Database.connect();
    
    Order.find(query).populate('user').exec()
    .then(orders => {
        if (!orders.length) return next()
        req.body.orders = orders
        return next()
    }).catch(error => {
        req.body.error = {message: 'Find error', error}
        next()
    }) 
}

module.exports = {
    getAll,
    getForField,
    create,
    update,
    remove,
    find  
}
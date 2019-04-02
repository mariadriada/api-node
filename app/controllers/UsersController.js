/*
* CRUD Users controller 
*/

const User = require('../models/Users')
const Database = require('../config/database')


// Find all users
async function getAll(req, res) {    
    Database.connect();

    await User.find()
    .then(users => {  
        if (users.length) return res.status(200).send(users)        
        return res.status(204).send('NO CONTENT')
    }).catch(error => res.status(500).send(error))
    
    // When data is transfer it close the database connecection
    Database.close()        
}

// Find user(s) for a specific field
function getForField(req, res) {   
    // close the database connecection
    Database.close()     
   
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})    
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'})
    let users = req.body.users
    return res.status(200).send({users})   
}

// Create a user
async function create(req, res) {
    Database.connect();

    let user = new User(req.body)
    console.log('user ', user)
    await user.save()
    .then(user => res.status(201).send({user}))
    .catch(error => res.status(500).send({error}))

    // When user is created it close the database connecection
    Database.close()     
}

// Update data user
async function update(req, res) {
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'})

    let user = req.body.users[0]
    user = Object.assign(user, req.body)
    await user.save()
        .then(user => res.status(200).send({message: 'UPDATED', user}))
        .catch(error => res.status(500).send({error}))

    // close the database connecection
    Database.close() 
}

//Delete one user
async function remove(req, res) {   
    const error = req.body.error;
    if(req.body.error) return res.status(500).send({error})   
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'})
    
    // Delete the first item
    await req.body.users[0].remove()    
        .then(user => res.status(200).send({message: 'REMOVED', user}))
        .catch(error => res.status(500).send({error}))
        
    // When user is deleted it close the database connecection
    Database.close()  
}

// Middleware
function find(req, res, next) {
    let query = {}
    query[req.params.key] = req.params.value

    Database.connect();
    
    User.find(query)
    .then(users => {
        if (!users.length) return next()
        req.body.users = users
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
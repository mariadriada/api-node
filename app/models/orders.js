const mongoose = require('mongoose')
const User = require('./users')

const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }, 
    name: {
        type: String,
        unique: true,
        required: true
    },
    lastname: {
        type: String,
        unique: true,
        required: true
    },
    email:  {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
})

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order
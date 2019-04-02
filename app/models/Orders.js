const mongoose = require('mongoose')
const User = require('./Users')


const OrderSchema = new mongoose.Schema({
    id_order: {
        type: Number,
        unique: true,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }, 
    delivery_address: {
        type: String,
        required: true
    },
    time_slot: {
        type: String,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    driver:  {
        type: String
    }
})

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order
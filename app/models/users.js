const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
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
    },
    address: {
        type: String,
        unique: true,
        required: true
    }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User
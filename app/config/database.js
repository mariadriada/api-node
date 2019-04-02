// Require to work with mongosse
const mongoose = require('mongoose')
const CONFIG = require('./config')

module.exports = {
    connection: null,
    connect: function() {
        if (this.connection) return this.connection
        return mongoose.connect(CONFIG.DB)
        .then(connection => {
            this.connection = connection
            console.log('Connection to database sucessfull!')
        }).catch(error => console.log(error))        
    }
}

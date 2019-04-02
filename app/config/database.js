// Require to work with mongosse
const mongoose = require('mongoose')
const CONFIG = require('./config')


module.exports = {
    connection: null,
    // Set database connection
    connect: function() {
        // If exists connection return it
        if (this.connection) return this.connection

        // Create connection       
        mongoose.connect(CONFIG.DB)        
        .then(connection => {
            this.connection = connection
            console.log('Connection to database sucessfull!')              
        }).catch(error => console.log(error)) 

        // Signal to diconected database ok
        mongoose.connection.on('disconnected', () => {
            this.connection = null
            console.log('Disconnected database!')
        })
        // return connection object
        return this.connection     
    },    
    //Close database connection
    close: function() {
        mongoose.connection.close()
    }
}

const CONFIG = require('./app/config/config')
const App = require('./app/app')


App.listen(CONFIG.PORT, (error) => {
    if (error) return console.log(error)
    console.log('Server running in port: ', CONFIG.PORT)
})
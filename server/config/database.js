const mongoose = require('mongoose')

const dbName = 'charity'
const connectionString = `mongodb://localhost:27017/${dbName}`

require('../models/User')
require('../models/Donation')
require('../models/Center')


module.exports = async()=>{

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
console.log(`database connected to ${dbName}`);
try {
    mongoose.connection.on('error', (err)=>{
        console.log('database error');
        console.error(err)
    })
} catch (error) {
    console.error('error connecting to database');
    process.exit(1)
}

}


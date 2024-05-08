const mongoose = require('../node_modules/mongoose')
require('dotenv').config()

const configuredb = async () =>{
    try{
        await mongoose.connect("mongodb+srv://rajathr02:Ka41me7574@cluster0.bknko2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('connected to db')
    }
    catch(e){
        console.log(e)
    }
}

module.exports = configuredb
const mongoose = require('../../node_modules/mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    nodes:{
        type:[]
    },
    edges:{
        type:[]
    }
},{timestamps:true})

const User = mongoose.model('UserModel',userSchema)

module.exports = User
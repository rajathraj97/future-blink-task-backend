const User = require('../Models/UserModdel')
const pick = require('../../node_modules/lodash/pick')
const bcrypt = require('../../node_modules/bcryptjs')
const jwt = require('../../node_modules/jsonwebtoken')
require('dotenv').config()
const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;
const otpGenerator = require('otp-generator')

const userCtlr = {}

userCtlr.register = async(req,res)=>{
    try{
        const body = pick(req.body,['email','password'])
        console.log(body)
        const user = new User(body)
        const salt =await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(user.password,salt)
        console.log(hashPassword)
        user.password = hashPassword
        const userDoc = await user.save()
        res.json(userDoc)
        
    }catch(e){
    res.status(404).json(e)
    }
}

userCtlr.login = async(req,res) =>{
   try{
    const body = pick(req.body,["email","password"])
    const user =await User.findOne({email:body.email})
    console.log(user)
    if(user){
      const password = await bcrypt.compare(body.password,user.password)
      if(password){
        const tokenData = {
            email:user.email,
        }
        const token = jwt.sign(tokenData,"abc123")
        res.status(200).json(`Bearer ${token}`)
      }else{
        res.json({error:"Invalid Password"})
      }
      
    }else{
        res.json({error:"Invalid User"})
    }

   }
   catch(e){
    res.json({e:"Invalid User"})
   }
}

userCtlr.save = async(req,res) =>{
    try{
    const body = pick(req.body,['nodes','edges','email'])
    const savedData = await User.findOneAndUpdate({email:body.email},{nodes:body.nodes,edges:body.edges})
    res.status(200).json({msg:"svaed"})
    }catch(e){
        res.status(400).json({msg:"not saved"})
    }
}

userCtlr.get = async(req,res) =>{
    try{
        const body = pick(req.body,['email'])
        const savedData = await User.findOneAndUpdate({email:body.email})
        res.status(200).json({savedData})
    }catch(e){
        res.status(400).json({msg:"error"})
    }
}

module.exports = userCtlr
const bt = require('bcrypt')
const jt = require('jsonwebtoken')
//const nm = require('nodemailer')
const Admin = require('./model')
const vS = require('./valid')
const sVs = require('./Svalid')
const Event = require('./eventModel')

module.exports={
    login: async (req,res)=>{
          try {
            const {password,email} = req.body
           const {error,value} = await vS.validate({password,email} )
           if(error){
            const re = /\"/g
            return res.status(400)
            .json({error:true,message:error.message.replace(re,"")||"something is wrong"})
           }
           const user = await Admin.findOne({email:value.email})
           if(!user){
            return res.status(404).json({
                error:true,
                message:"invalid credentials no"
            })
           }
           const passmatch = true//await bt.compare(password,user.password)
           if(!passmatch){
            return res.status(404).json({
                error:true,
                message:"invalid credentials"
            })
           }
           //
        
         
          
           const juser = jt.sign({
            id:user._id,
           },process.env.jtSec)
           res.status(200).json({
            token:juser,
            name:user.name,
            role:"administarator"

           })
           
           
          } catch (error) {
            res.status(500).send({error:true,message:error.message||'somethin is wrong'})
          }
    },
    publishEvent:async (req,res)=>{
        try {
            const {eventTitle,eventBody} = req.body
            if(!(eventTitle||eventBody)) return res.status(400).send({error:true,message:"provide title and body of the event"})
            const event = await new Event({eventTitle,eventBody})
            const d = await event.save()
           
            res.status(200).json(event)
        } catch (error) {
            res.status(500).send({error:true,message:error.message||'somethin is wrong'})
        }
    },
    getEvents:async (req,res)=>{
        try {
            const page = req.params.page||0
            
            const limit = 3
            const sk = page*limit
            const events = await Event.find({}).skip(sk).sort({publishDate:-1}).limit(limit)
            res.status(200).json(events)
        } catch (error) {
            res.status(500).send({error:true,message:error.message||'somethin is wrong'})
        }
    },
    clearEvents:async (req,res)=>{
        try {
            await Event.deleteMany({})
            res.status(200).json({success:true,message:"cleared"})
        } catch (error) {
            res.status(500).send({error:true,message:error.message||"error while clearing events"})
        }
    },
    sign: async (req,res)=>{
        try {
            const {name,lastname,password,email}=req.body
            const {error,value} = sVs.validate({name,lastname,password,email})
                if(error){
                    return res.status(201).json({
                        error:true,
                        message:error.message||'invalid credentials'
                    })
                }
                const user = await Admin.findOne({email:email})
                if(user){
                    return res.json({
                        error:true,
                        message:"try using another acount"
                    })
                }
                const salt = await bt.genSalt(10)
                const hashedpass = await bt.hash(password,salt)
                value.password=hashedpass;
                const ad = await new Admin(value)
                 const adt = await ad.save();
                 const token = jt.sign({id:adt._id},process.env.jtSec)
                 res.status(200).json({
                    token,
                    user:value
                 })
        } catch (error) {
            res.json({
                error:true,
                message:error.message||"something is wrong"
            })
        }
    }
}
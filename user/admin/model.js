const bt = require('bcrypt')
const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        max:20
    },
    lastname:{
        type:String,
        max:20,
    },
    email:{
        type:String,
        max:30,
    },
    password:{
        type:String,
        min:6,
    },
    role:{type:String,default:'admin'}
})
adminSchema.pre('save', async (done)=>{
    // const salt = await bt.genSalt(10)
    //  await bt.hash(this.password,salt);
     done()
})
module.exports = mongoose.model('admin',adminSchema);
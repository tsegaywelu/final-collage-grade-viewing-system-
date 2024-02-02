const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    contactEmail:{type:String,required:true},
    suggestion:{type:String,required:true}
})
module.exports = mongoose.model("Contact",ContactSchema);
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({
    eventTitle:{
        type:String,
        required:true,
        max:100
    },
    eventBody:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Event",eventSchema)
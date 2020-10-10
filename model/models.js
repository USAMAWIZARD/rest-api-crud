const mongoose = require("mongoose")

const subscriberSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true 
    },
    subscribedto:{
        type:String,
        required:true
    },
    datesubscribed:{
        type:Date,
        default:Date.now()
    }

}) 
module.exports = mongoose.model('subscribers',subscriberSchema)
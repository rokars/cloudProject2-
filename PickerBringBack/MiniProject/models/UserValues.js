const mongoose = require('mongoose')

const userValues = new mongoose.Schema({
    gearValue:{
        type:String,
        required:true
    },
    commsion:{
        type:String,
        required:true
    },
    deposit:{
        type:String,
        required:true
    },
    materialCost:{
        type:String,
        required:true
    },
    finalcost:{
        type:String,
        default:Date.now
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('mytable', userValues)
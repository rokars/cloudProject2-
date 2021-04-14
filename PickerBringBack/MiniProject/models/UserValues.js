const mongoose = require('mongoose')

const userValues = new mongoose.Schema({
    gearSalePrice:{
        type:String,
        required:true
    },
    totalMaterialSaleCost:{
        type:String,
        required:true
    },
    saleCommission:{
        type:String,
        required:true
    },
    saleDeposit:{
        type:String,
        required:true
    },
    totalSaleProfit:{
        type:String,
        default:Date.now
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('mytable', userValues)
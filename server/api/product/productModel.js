const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    autoId:{ type: Number, default:0},
    name:{ type: String, default:""},
    description:{ type: String, default:""},
    price:{ type: Number, default:0},
    categoryId:{ type:mongoose.Schema.Types.ObjectId, default:null, ref:"category"},
    image:{ type: String, default:""},
    createdAt:{ type: Date, default:Date.now()},
    status:{ type:Boolean, default:true}
})

module.exports = mongoose.model('product', productSchema)
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    product_name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    monthly_price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    security_deposit:{
        type:Number,
        required:true
    },
    images:{
        type:String,
        required:true
    },
  }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
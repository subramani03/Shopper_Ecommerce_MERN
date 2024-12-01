const mongoose= require("mongoose");

const productSchema =mongoose.Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    old_price:{
        type:String,
        required:true,
    },
    new_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,

    }
});

const ProductModel = mongoose.model("User",productSchema);
module.exports=ProductModel;
import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    code:{
        type:Number,
        required: true,
        unique: true
    },
    stock:{
        type:Number,
        required: true
    }
})

export const cartModel = mongoose.model('cart', cartSchema)
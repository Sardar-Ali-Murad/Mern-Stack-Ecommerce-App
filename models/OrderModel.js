
import mongoose from "mongoose";

let OrderSchema=new mongoose.Schema({
    createdBy:{
        type:String,
        required:[true,"Creted By Whom"]
    },
    creatorName:{
        type:String,
        required:[true,"What is the creator name"]
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Mern_Stack_Ecommernece_Products"
    },
    status:{
        type:String,
        enum:["pending","decline","completed"],
        default:"pending"
    },
    totalPrice:{
        type:Number,
        required:[true,"What is the total price"]
    },
    // subtotal:{
    //     type:Number,
    //     required:[true,"What is the subtotal"]
    // },
    // shippingFee:{
    //     type:Number,
    //     required:[true,"What is the shipping fee"]
    // },
    // tax:{
    //     type:Number,
    //     required:[true,"What is the total tax"]
    // },
    product:{
        type:Array,
        required:[true,"What is the total price"]
    },
    productQuantity:{
        type:Number,
        default:1
    }
},{timestamps:true})

export default mongoose.model("mern_Ecoomernce_Orders",OrderSchema)
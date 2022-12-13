import mongoose from "mongoose";

let productSchema=new mongoose.Schema({
   name:{
    type:String,
    // minlength:5,
    // maxlength:10,
    required:[true,"Please Pprovide the product name"]
   },


   price:{
    type:Number,
    require:[true,"Please Provide the price"]
   },

   title:{
    type:String,
    required:[true,"Please provide the title"],
   },

   description:{
    type:String,
    required:[true,"Please provide the title"],
   },

   image:{
    type:String
   },

   rating:{
      type:Number,
      default:0
   },

   createdBy:{
    type:mongoose.Types.ObjectId,
     required:[true,"Created by Whom?"],
     ref:"Admin"
   }
},{timestamps:true})

export default mongoose.model("Mern_Stack_Ecommernece_Products",productSchema)
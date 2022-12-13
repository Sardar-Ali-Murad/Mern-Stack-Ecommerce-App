import { DisabledByDefault } from "@mui/icons-material";
import mongoose from "mongoose";

let SchemaReviews=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Provide the title"]
    },
    description:{
        type:String,
        required:[true,"Provide the description"]
    },
    rating:{
        type:Number,
        required:[true,"Provide the rating"]
    },
    product:{
        type:Array
    },

    creatorName:{
      type:String,
      required:[true,"Please provide the creator"]
    },

    productReviewId:{
      type:String,
      required:[true,'please Provide the product id']
    },

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Provide the Usere id"]
    },
    productId:{
        
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:[true,"Provide the product Id"]
    },

})

export default mongoose.model("Mern_Ecommerence_Reviews",SchemaReviews)
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validate from "validator"


let authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide The Name"],
        minlength:4,
        maxlength:30,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please Provide The Email"],
        validate:{
            validator:validate.isEmail,
            message:'Please Provide the correct email'
        },
        unique:true
    },
    role:{
        type:String
    },
    password:{
        type:String,
        required:[true,"Please Provide the pasword"]
    }
})

authSchema.pre("save",async function(){
    if (!this.isModified('password')) return;
    let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

authSchema.methods.comparePassword= async function(candidatePassword){
   let result=await bcrypt.compare(candidatePassword,this.password)
   return result
}


authSchema.methods.createJWT=function(){
     return jwt.sign({userId:this._id,name:this.name,email:this.email,role:this.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
     })
}

export default mongoose.model("Ecommerence_Mern_App_Users",authSchema)


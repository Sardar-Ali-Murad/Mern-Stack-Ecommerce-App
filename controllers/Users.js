import Auth from "../models/Auth.js"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"


let Register=async (req,res)=>{
    let {name,password,email}=req.body

    if(!name || !password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }

    let emailAlreadyExists=await Auth.findOne({email})
    if(emailAlreadyExists){
        throw new BadRequestError("Email Already Exists")
    }

    let isFirstUser=await Auth.countDocuments()

    if(isFirstUser===0){
        req.body.role="admin"
    }

    else{
        req.body.role="user"
    }
    console.log(isFirstUser)

    let user=await Auth.create({name,password,email,role:req.body.role})

    let token =user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user:{name,email},
        token:token,
        role:user.role
    })
}



let Login=async (req,res)=>{
    let {password,email}=req.body
    
    if(!password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }
    
    let user=await Auth.findOne({email})
    if(!user){
        throw new BadRequestError("User Does Not Exists")
    }

    let isPasswordCorrect=await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new BadRequestError('Password is not correct')
    }
   
    
    let token =user.createJWT()
    
    res.status(StatusCodes.CREATED).json({
        user:{name:user.name,email},
        token:token
    })
    
}

const getAllUsers=async (req,res)=>{
    let currentUser=await Auth.findOne({_id:req.user.userId})

    if(currentUser.role!=="admin"){
        throw new  UnAuthenticatedError("You are not the admin to accesss this route")
    }

    console.log(currentUser)
    console.log(req.user)

    let users=await Auth.find({})

    res.status(StatusCodes.OK).json({users})
}

const updateUser=async (req,res)=>{
    let {name,email}=req.body

    if(!name || !email){
        throw new BadRequestError("Please Provide All The Credentials")
    }

   let currentUser=req.user.userId

   let user=await Auth.findOne({_id:currentUser})

   if(!user){
    throw new BadRequestError("There is no user")
   }

   user.name=name
   user.email=email

   await user.save()

   let token=user.createJWT()


   res.status(StatusCodes.OK).json({msg:"The User is Updated Successfully",token,user:{name:user.name,email:user.email}})

}


const updateUserPassword=async (req,res)=>{
   let {newPassword}=req.body

   if( !newPassword){
    throw new BadRequestError("Please Provide the value")
   }

   let currentUser=await Auth.findOne({_id:req.user.userId})


    currentUser.password=newPassword

    await currentUser.save()

    res.status(StatusCodes.OK).json({msg:'Password Updated Successfully'})
}






export {Register,Login,updateUser,updateUserPassword,getAllUsers}
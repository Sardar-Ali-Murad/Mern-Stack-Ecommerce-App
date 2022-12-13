import ReviewModel from "../models/ReviewModel.js"
import Products from "../models/Product.js"
import Users from "../models/Auth.js"

import {StatusCodes} from "http-status-codes"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"



const createReview=async (req,res)=>{

    let {title,description,rating,productId}=req.body

    
    
    if(!description || !rating || !title || !productId){
        throw new BadRequestError("Please Provide all the values")
    }
    
    let alreadyReviewed=await ReviewModel.findOne({productId:productId,createdBy:req.user.userId})

    if(alreadyReviewed){
        throw new BadRequestError("You have already given a review to this product")
    }


    let product=await Products.findOne({_id:productId})

    if(!product){
        throw new NotFoundError("The product is not here")
    }
    let currentProduct=await Products.findOne({_id:productId})

    let currentUser=await Users.findOne({_id:req.user.userId})

     req.body.createdBy=req.user.userId
     req.body.product=currentProduct
     req.body.creatorName=currentUser.name
     req.body.productReviewId=product._id.toString()


     let review=await ReviewModel.create({...req.body})

     res.status(StatusCodes.CREATED).json({review})
   
}

const getSingleUserReview=async (req,res)=>{
    let singleUserReviews=await ReviewModel.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({singleUserReviews})
}


const getAllReviews=async (req,res)=>{
    let currentUserId=req.user.userId

    
    let currentUser=await Users.findOne({_id:currentUserId})


    // if(currentUser.role!=="admin"){
    //     throw new UnAuthenticatedError("You are not the admin to access this route")
    // }
    
    // the reason foe below is we want to also deletete the user its own reviews see in app context 439 line
    if(!req.user){
            throw new UnAuthenticatedError("You are not the admin to access this route")
    }

    let allReviews=await ReviewModel.find({})

    res.status(StatusCodes.OK).json({allReviews})

}


const updateReview=async (req,res)=>{
    let {id}=req.params
    let {title,description,rating}=req.body

  

   

        // let currentReview=await ReviewModel.findOne({_id:id,createdBy:req.user.userId})

        // by adding the update review functianality by the admin
        let currentReview=await ReviewModel.findOne({_id:id})

        if(!currentReview){
            throw new NotFoundError("the review is not there")
        }

        let currentUser=await Users.findOne({_id:req.user.userId})
        
        if(currentReview.createdBy!=req.user.userId && currentUser.role!=="admin"){
            throw new UnAuthenticatedError("You are not Authorized to do this")
        }
        
        currentReview.title=title
        currentReview.description=description
        currentReview.rating=rating
        
        await currentReview.save()
        
        res.status(StatusCodes.OK).json({currentReview})
        
    }

    // intead of the below we can use the above observe
    
    const updateReviewByAdmin=async (req,res)=>{
        let {id}=req.params
    let {title,description,rating}=req.body

    let currentUser=await Users.findOne({_id:req.user.userId})
    // console.log(currentUser)
    if(currentUser.role!=="admin"){
        throw new UnAuthenticatedError("You are not the admin to do this")
    }
    let review=await ReviewModel.findOne({_id:id})

    if(!title || !description || !rating){
        throw new BadRequestError("provide the values")
    }
    review.title=title
    review.description=description
    review.rating=rating
    
    await review.save()

    res.status(StatusCodes.OK).json({review})
    
}



const deleteReview=async (req,res)=>{
    let {id}=req.params
   
  
    // let currentReview=await ReviewModel.findOne({_id:id,createdBy:req.user.userId})
    let currentReview=await ReviewModel.findOne({_id:id})

     if(!currentReview){
        throw new NotFoundError("the review is not there")
     }
 

     
    let currentUser=await Users.findOne({_id:req.user.userId})

    if(currentReview.createdBy!=req.user.userId && currentUser.role!=="admin"){
        throw new UnAuthenticatedError("You are not Authorized to do this")
    }


    await currentReview.remove()
   
    res.status(StatusCodes.OK).json({currentReview})
}


export {

    createReview,
    getSingleUserReview,
    getAllReviews,
    updateReview,
    deleteReview,
    updateReviewByAdmin
}
import ProductModel from "../models/Product.js"
import User from "../models/Auth.js"
import {StatusCodes} from "http-status-codes"
import ReviewModel from "../models/ReviewModel.js"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"


const createProduct=async (req,res)=>{
   const {name,price,image,title,description}=req.body

   if(!name || !image || !title || !description){
    throw new BadRequestError("Please provide the values")
   }

   const currentUser=await User.findOne({_id:req.user.userId})
   

   if(currentUser.role!=="admin"){
    throw new UnAuthenticatedError("You are not the admin to to this")
   }

   req.body.createdBy=req.user.userId

   let product=await ProductModel.create({...req.body})

   res.status(StatusCodes.CREATED).json({product})
}



const getAllProduct=async (req,res)=>{
    let {title,description,sort}=req.query
    let filterObject={
        // createdBy:"6315ac9cb687906917a27f3e"
    }

    if(title && title!=="all"){
        filterObject.title={$regex:title,$options:"i"}
    }

    if(description && description!=="all"){
        filterObject.description={$regex:description,$options:"i"}
    }

    let pendindProduct=ProductModel.find(filterObject)

    if(sort && sort==="price"){
        pendindProduct.sort("price")
    }

    if(sort && sort==="name"){
        pendindProduct.sort("name")
    }

    let page=(req.query.page) || 1
    let limit=(req.query.limit) || 6
    let skip=(page-1)*limit

    pendindProduct=pendindProduct.skip(skip).limit(limit)

    let finalProduct=await pendindProduct

    let totalProducts=await ProductModel.countDocuments(filterObject)

    let totalPages=Math.ceil(totalProducts/limit)


    res.status(StatusCodes.OK).json({products:finalProduct,totalPages,totalProducts})
}



const updateProduct=async (req,res)=>{
   let {id}=req.params
   let {price,title}=req.body

   let product=await ProductModel.findOne({_id:id})

   if(!product){
    throw new NotFoundError("The Product is not there")
   }

   let currentUser=await User.findOne({_id:req.user.userId})

   if(currentUser.role!=="admin"){
     throw new UnAuthenticatedError("You are not the admin to do this ")
   
   }
   
   product.price=price
   product.title=title

   await product.save()

   res.status(StatusCodes.OK).json({product,msg:"Product Updated Successfully"})
}


const deleteProduct=async (req,res)=>{
   let {id}=req.params

   let product=await ProductModel.findOne({_id:id})

   if(!product){
    throw new NotFoundError("The Product is not there")
   }


   let currentUser=await User.findOne({_id:req.user.userId})
//    console.log(req.user)
//    console.log(currentUser)
      console.log(product)

   if(currentUser.role!=="admin"){
     throw new UnAuthenticatedError("You are not the admin to do this ")
   }

   let productReviews=await ReviewModel.findOne({productId:id})
   
   if(productReviews){

       await productReviews.remove()
   }

    
   await product.remove()

   res.status(StatusCodes.OK).json({msg:"The product is deleted successfulluy"})


}


const singleProductReviews=async (req,res)=>{
    let {id}=req.params

    let singleProductReviews=await ReviewModel.find({productId:id})
    // console.log(singleProductReviews)

    res.status(StatusCodes.OK).json({singleProductReviews})

}
export {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    singleProductReviews
}
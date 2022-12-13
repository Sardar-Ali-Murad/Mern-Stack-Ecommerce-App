import OrderModel from "../models/OrderModel.js"
import ProductModel from "../models/Product.js"
import UserModel from "../models/Auth.js"

import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"
import { StatusCodes } from "http-status-codes"
import Auth from "../models/Auth.js"

const createOrder=async (req,res)=>{
    let {productId}=req.body

    if(!productId){
        throw new BadRequestError("please provide the product id")
    }
    
    let currentProduct=await ProductModel.findOne({_id:productId})
    
    if(!currentProduct){
        throw new NotFoundError("the product is not present")
    }

    let orderAlreadyExists=await OrderModel.findOne({createdBy:req.user.userId,productId})

    if(orderAlreadyExists){
        throw new BadRequestError("You Already have ordered this one")
    }


    let productPrice=currentProduct.price

    let currentUser=await Auth.findOne({_id:req.user.userId})

    let userName=currentUser.name


    req.body.createdBy=req.user.userId

    req.body.creatorName=userName

    req.body.totalPrice=productPrice

    req.body.product=currentProduct

    req.body.productId=productId

    let Order=await OrderModel.create({...req.body})

    res.status(StatusCodes.CREATED).json({Order})


}


const getSingleUserOrders=async (req,res)=>{
    

    let Orders=await OrderModel.find({createdBy:req.user.userId})

    res.status(StatusCodes.OK).json({Orders})
}


const getAllOrders=async (req,res)=>{
   let currentUser=await UserModel.findOne({_id:req.user.userId}).populate("productId")

   console.log(currentUser)

   if(currentUser.role!=="admin"){
    throw new UnAuthenticatedError("You are not the admin to access this route")
   }

   let Orders=await OrderModel.find({})

   res.status(StatusCodes.OK).json({Orders})
}


const updateOrder=async (req,res)=>{
    let {id}=req.params
    let {status,productQuantity}=req.body
    
    if(!status ){
        throw new BadRequestError("please provide the status")
    }

    let currentProductOrder=await OrderModel.findOne({_id:id})
    // console.log(currentProductOrder)

    if(currentProductOrder.createdBy!=req.user.userId){
        throw new UnAuthenticatedError("YOu cannot updatre this orders")
    }

    currentProductOrder.status=status
    currentProductOrder.productQuantity=productQuantity || currentProductOrder.productQuantity

    await currentProductOrder.save()

    res.status(StatusCodes.OK).json({currentProductOrder})


}

const deleteOrder=async (req,res)=>{
    let {id}=req.params

    let order=await OrderModel.findOne({_id:id,createdBy:req.user.userId})

    if(!order){
        throw new UnAuthenticatedError("You order is not here ")

    }

    let currentUser=await UserModel.findOne({_id:req.user.userId})

    // if(order.createdBy!=req.user.userId || currentUser.role!=="admin"){
    //     throw new UnAuthenticatedError("You cannot delete this order")
    // }

    await order.remove()

    res.status(StatusCodes.OK).json({msg:'The order is deleted successfully'})

}

const deleteAllOrders=async (req,res)=>{
    
   
    let orders=await OrderModel.deleteMany({createdBy:req.user.userId})
   
    // await orders.remove()

    res.status(StatusCodes.OK).json({msg:"The all orders are deleted successfully"})
}

export {
    createOrder,
    getSingleUserOrders,
    getAllOrders,
     updateOrder,
     deleteOrder,
    deleteAllOrders
}
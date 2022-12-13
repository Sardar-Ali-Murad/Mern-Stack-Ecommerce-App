import { INSUFFICIENT_SPACE_ON_RESOURCE, StatusCodes } from 'http-status-codes'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  
  CHANGE_PAGE,
  GET_ALL_USERS,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,

  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  HANDLE_RATING,
  
  CLEAR_UPLOADS,

  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  HANDLE_UPDATE_PRODUCT,

  PRODUCT_DETAIL_ID,
  CLEAR_REVIEW,

  FINAL_UPDATE_PRODUCT_BEGIN,
  FINAL_UPDATE_PRODUCT_SUCCESS,
  FINAL_UPDATE_PRODUCT_ERROR,

  SUBMIT_REVIEW_BEGIN,
  SUBMIT_REVIEW_SUCCESS,SUBMIT_REVIEW_ERROR,

  DELETE_REVIEW,
  SINGLE_PERSON_REVIEW,
  
  UPDATE_REVIEW_BEGIN,
  UPDATE_REVIEW_ERROR,
  UPDATE_REVIEW_SUCCESS,

  GET_ADMIN_ALL_REVIEWS,
  SINGLE_PRODUCTS_REVIEWS,

  CREATE_ORDER_ERROR,CREATE_ORDER_SUCCESS,
  SINGLE_USER_ORDERS,
  ADMIN_ALL_ORDERS,
  SUCCESS_OR_FAILURE_ACTIONS
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      user:null,
      token:null
    }
  }

  if(action.type===UPDATE_USER_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===UPDATE_USER_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"user updated succfully",
      alertType:"success",
      isLoading:false,
      user:action.payload.user,
      token:action.payload.token
    }
  }

  if(action.type===UPDATE_USER_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger",
      isLoading:false
    }
  }

  if(action.type===UPDATE_PASSWORD_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===UPDATE_PASSWORD_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"user password updated succfully",
      alertType:"success",
      isLoading:false,
    }
  }

  if(action.type===UPDATE_PASSWORD_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger",
      isLoading:false
    }
  }



  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      image:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      page:1,
      [action.payload.name]:action.payload.value,
    }
  }




  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      page:action.payload.page
    }
  }

  if(action.type===GET_ALL_USERS){
    return{
      ...state,
      allUsers:action.payload.users
    }
  }

  if(action.type===GET_ALL_PRODUCTS_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===GET_ALL_PRODUCTS_ERROR){
    return{
      ...state,
      isLoading:false
    }
  }


  if(action.type===GET_ALL_PRODUCTS_SUCCESS){
    return{
      ...state,
      isLoading:false,
      totalPages:action.payload.totalPages,
      totalProducts:action.payload.totalProducts,
      products:action.payload.products
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
      price:"",
      image:null,
      title:"",
      description:"",
      name:"",
      editPrice:null,
      editTitle:null,
      editProductId:""
    }
  }

  if(action.type===CREATE_PRODUCT_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===CREATE_PRODUCT_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertType:"success",
      alertText:"Product is added successfully",
      isLoading:false
    }
 }


  if(action.type===CREATE_PRODUCT_ERROR){
    return{
      ...state,
      showAlert:true,
      alertType:"danger",
      alertText:action.payload.msg,
      isLoading:false
    }
  }

  if(action.type===HANDLE_UPDATE_PRODUCT){
    return{
      ...state,
      editProductId:action.payload.id,
      editPrice:action.payload.price,
      editTitle:action.payload.title
    }
  }

  if(action.type===FINAL_UPDATE_PRODUCT_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===FINAL_UPDATE_PRODUCT_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:"Product Updat Successfully",
      alertType:"success",
    }
  }

  if(action.type===FINAL_UPDATE_PRODUCT_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger",
    }
  }

  if(action.type===PRODUCT_DETAIL_ID){
    return{
      ...state,
      productDetailId:action.payload.id
    }
  }

  if(action.type===CLEAR_REVIEW){
    return{
      ...state,
      reviewTitle:"",
      reviewDescription:"",
      reviewRating:""
    }
  }

  if(action.type===SUBMIT_REVIEW_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===SUBMIT_REVIEW_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:"Review is added successfully",
      alertType:"success",
    }
  }

  if(action.type===SUBMIT_REVIEW_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger",
    }
  }

  if(action.type===SINGLE_PERSON_REVIEW){
    return{
      ...state,
      reviews:action.payload.reviews
    }
  }

  if(action.type===UPDATE_REVIEW_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===UPDATE_REVIEW_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"success",
      alertText:"Updated Successfully"
    }
  }

  if(action.type===UPDATE_REVIEW_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"danger",
      alertText:action.payload.msg
    }
  }

  if(action.type===GET_ADMIN_ALL_REVIEWS){
    return{
      ...state,
      adminAllReviews:action.payload.reviews
    }
  }

  if(action.type===SINGLE_PRODUCTS_REVIEWS){
    return{
      ...state,
      singleProductReview:action.payload.reviews,
      singleProductAverageRating:action.payload.averageRating
    }
  }

  if(action.type===CREATE_ORDER_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"The Order Is Added To the Cart",
      alertType:"success"
    }
  }
  if(action.type===CREATE_ORDER_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }

  if(action.type===SINGLE_USER_ORDERS){
    return{
      ...state,
      singleUserOrders:action.payload.orders
    }
  }

  if(action.type===ADMIN_ALL_ORDERS){
    return{
      ...state,
      allOrdersForAdmin:action.payload.orders
    }
  }

  if(action.type===SUCCESS_OR_FAILURE_ACTIONS){
    return{
      ...state,
      singleUserOrders:[]
    }
  }

  if(action.type===HANDLE_RATING){
    return{
      ...state,
      reviewRating:action.payload.data
    }
  }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer

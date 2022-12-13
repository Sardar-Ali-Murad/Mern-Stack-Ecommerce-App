import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import getStripe from './GetStripe'

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
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_ERROR,GET_ALL_PRODUCTS_SUCCESS,
  CLEAR_UPLOADS,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  HANDLE_UPDATE_PRODUCT,

  FINAL_UPDATE_PRODUCT_BEGIN,
  FINAL_UPDATE_PRODUCT_SUCCESS,
  FINAL_UPDATE_PRODUCT_ERROR,

  PRODUCT_DETAIL_ID,
  CLEAR_REVIEW,
  SUBMIT_REVIEW_BEGIN,
  SUBMIT_REVIEW_ERROR,
  SUBMIT_REVIEW_SUCCESS,

  SINGLE_PERSON_REVIEW,
  DELETE_REVIEW,
  
  UPDATE_REVIEW_BEGIN,
  UPDATE_REVIEW_ERROR,
  UPDATE_REVIEW_SUCCESS,

  GET_ADMIN_ALL_REVIEWS,
  SINGLE_PRODUCTS_REVIEWS,

  CREATE_ORDER_BEGIN,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,

  SINGLE_USER_ORDERS,
  ADMIN_ALL_ORDERS,

  DELETE_ORDER,

  GET_STRIPE,
  SUCCESS_OR_FAILURE_ACTIONS,
  HANDLE_RATING
} from './actions'
import { UpdateProduct } from '../components/admindashboard'
// import { handle } from 'express/lib/router'



const token = localStorage.getItem('token')
const user = localStorage.getItem('user')



const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  allUsers:[],
  updateName:"",
  updateEmail:"",
  updatePassword:"",

  page:1,
  searchDescription:"",
  searchTitle:"",
  sort:"all",
  products:[],
  totalPages:null,
  totalProducts:null,

  name:"",
  price:"",
  title:"",
  description:"",
  image:null,

  editProductId:"",
  editPrice:null,
  editTitle:"",



  productDetailId:null,
  reviewTitle:"",
  reviewDescription:"",
  reviewRating:"",

  reviews:[],
  adminAllReviews:[],
  singleProductReview:[],
  singleProductAverageRating:0,

  singleUserOrders:[],
  allOrdersForAdmin:[],

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)




  // axios setup
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error.response)
      // if (error.response.status === 401) {
      //   logoutUser()
      // }
      return Promise.reject(error)
    }
  )


  // axios setup end



  // display alert begin
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  // display alert end
  


  // clear alert begin
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
  // clear alert end


  // local storage begin
  
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }
  
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }
  // local storage end
  
  

  // setup user begin
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      
      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  // setup user end
  
  


  // logout user begin
  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }
  // logout userend
  

  // all get user begin
  
  const allUsersfun=async ()=>{
    try {
      let {data}=await axios.get("/api/v1/auth",{headers:{Authorization:`Bearer ${state.token}`}})
      console.log(data)
      dispatch({type:GET_ALL_USERS,payload:{users:data.users}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  // all get user end



  
  // update user begin
  const updateuser=async ()=>{
    dispatch({type:UPDATE_USER_BEGIN})
    // console.log(state.token)
    
    try {
      let {data}=await axios.patch("/api/v1/auth/updateUser",
      {
        name:state.updateName,
        email:state.updateEmail
      },
      {
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      }
      )
      
      dispatch({type:UPDATE_USER_SUCCESS,payload:{msg:data.msg,token:data.token,user:data.user}})
      addUserToLocalStorage({ user:data.user, token:data.token })
      // localStorage.setItem("user",JSON.stringify(data.user))
    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({type:UPDATE_USER_ERROR,payload:{msg:error.response.data.msg}})
    }
    
    clearAlert()
  }
  
  
  // update user end



  // update password begin
  const updateuserpassword=async ()=>{
    dispatch({type:UPDATE_PASSWORD_BEGIN})
    // console.log(state.token)
    
    try {
      let {data}=await axios.patch("/api/v1/auth/updateUserPassword",
      {
      newPassword:state.updatePassword
    },
    {
      headers:{
        Authorization:`Bearer ${state.token}`
      }
    }
     )

     dispatch({type:UPDATE_PASSWORD_SUCCESS})
    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({type:UPDATE_PASSWORD_ERROR,payload:{msg:error.response.data.msg}})
    }

    clearAlert()
  }
  // update password end
  



  // all get products begin
  const allProducts=async ()=>{
    dispatch({type:GET_ALL_PRODUCTS_BEGIN})
    
    try {
      let {data}=await authFetch.get(`/product?title=${state.searchTitle}&description=${state.searchDescription}&sort=${state.sort}&&page=${state.page}`)

      dispatch({type:GET_ALL_PRODUCTS_SUCCESS,payload:{products:data.products,totalPages:data.totalPages,totalProducts:data.totalProducts}})

    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({type:GET_ALL_PRODUCTS_ERROR})
    }
  }
  // all get products end

  // SUBMIT PRODUCT STARTS

     const createProduct=async ()=>{
      dispatch({type:CREATE_PRODUCT_BEGIN})

      try {
        let {name,price,image,title,description}=state
        let {data}=await authFetch.post("/product",{name,price,image,title,description})

        dispatch({type:CREATE_PRODUCT_SUCCESS})
        allProducts()
        clearUploads()
      } catch (error) {
        console.log(error.response.data.msg)
        dispatch({type:CREATE_PRODUCT_ERROR,payload:{msg:error.response.data.msg}})
      }

      clearAlert()
     }

  // SUBMIT PRODUCT ENDS

  // delete product starts

  const  deleteProduct=async (id)=>{
      console.log(id)
    try {
      await authFetch.delete(`/product/${id}`)
      allProducts()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  // delete product ends

  // UpdateProduct STARTS
   
  const updateProduct=async (id)=>{
    let product=state.products.find((all)=>all._id===id)
    dispatch({type:HANDLE_UPDATE_PRODUCT,payload:{id:id,price:product.price,title:product.title}})
  }

  const   finalUpdateProduct=async ()=>{
    dispatch({type:FINAL_UPDATE_PRODUCT_BEGIN})

    try {
      await authFetch.patch(`/product/${state.editProductId}`,{price:state.editPrice,title:state.editTitle})
      dispatch({type:FINAL_UPDATE_PRODUCT_SUCCESS})
      // clearUploads()
    } catch (error) {
      dispatch({type:FINAL_UPDATE_PRODUCT_ERROR,payload:{msg:error.response.data.msg}})
    }
    clearAlert()
  }

  // UpdateProduct ENDS


  // product detail id starts

  function productDetailId(id){
    dispatch({type:PRODUCT_DETAIL_ID,payload:{id}})
  }
  // product detail id ends

  function clearReviews(){
    dispatch({type:CLEAR_REVIEW})
  }


  // submit review starts

  const submitReview=async ()=>{
    dispatch({type:SUBMIT_REVIEW_BEGIN})

    try {
      await authFetch.post(`/product/reviews`,{
        title:state.reviewTitle,
    description:state.reviewDescription,
    rating:state.reviewRating,
    productId:state.productDetailId
  })

   dispatch({type:SUBMIT_REVIEW_SUCCESS})
   clearReviews()
  } catch (error) {
    
    dispatch({type:SUBMIT_REVIEW_ERROR,payload:{msg:error.response.data.msg}})

}
singleProductReviews(state.productDetailId)
clearAlert() 
  }
  // submit review ends


  // SINGLE_PERSON_REVIEW STARTS

  const singlePersonReviews=async ()=>{
     try {
      let {data}=await authFetch.get("/product/reviews/getSingleUserReviews")

      dispatch({type:SINGLE_PERSON_REVIEW,payload:{reviews:data.singleUserReviews}})
     } catch (error) {
      // console.log(error.response.data.msg)
     }
  }
  // SINGLE_PERSON_REVIEW ENDS
  
  
  // delete review starts

  const deleteReview=async (id)=>{
    // console.log(id)
    try{
      // await authFetch.delete(`/product/reviews/${id}`)
      await axios.delete(`/api/v1/product/reviews/${id}`,{headers:{Authorization:`Bearer ${state.token}`}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
    singlePersonReviews()
    adminReviews()
  }
  // delete review  ends

  // update Review starts
    const updateReview=async ({id,title,description,rating})=>{
        dispatch({type:UPDATE_REVIEW_BEGIN})

        try {
          await authFetch.patch(`/product/reviews/${id}`,{title,description,rating})
          dispatch({type:UPDATE_REVIEW_SUCCESS})
        } catch (error) {
          dispatch({type:UPDATE_REVIEW_ERROR,payload:{msg:error.response.data.msg}})
        }
        clearAlert()
    }
   
  // update Review ends

  // admin all reviews starts

  const adminReviews=async ()=>{
    try {
      let {data}=await authFetch.get("/product/reviews/getAllReviews")
      dispatch({type:GET_ADMIN_ALL_REVIEWS,payload:{reviews:data.allReviews}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  // admin all reviews ends


  // SINGLE_PERSON_REVIEW STARTS
  const singleProductReviews=async (id)=>{
    let {data}=await authFetch.get(`/product/singleProductReview/${id}`)
    let totalRatingNumber=0
    data.singleProductReviews.map((all)=>{
      totalRatingNumber+=all.rating
    })
   
    let averageRating=totalRatingNumber/data.singleProductReviews.length
    console.log(averageRating)
    try {
      dispatch({type:SINGLE_PRODUCTS_REVIEWS,payload:{reviews:data.singleProductReviews,averageRating}})
      
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

 function handleRating(count){
    dispatch({type:HANDLE_RATING,payload:{data:count}})
  }
  // SINGLE_PERSON_REVIEW ENDS

  // CREATE_ORDER STARTS
  const createOrder=async (id)=>{
    
    try {
      // await axios.post("/api/v1/product/orders/createOrder",{headers:{Authorization:`Bearer ${state.token}`}},{productId:id})
      await authFetch.post("/product/orders/createOrder",{productId:id})
      dispatch({type:CREATE_ORDER_SUCCESS})
    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({type:CREATE_ORDER_ERROR,payload:{msg:error.response.data.msg}})
    }

    clearAlert()
  }
  // CREATE_ORDER ENDS

  // single users orders starts

   const userOrders=async ()=>{
    try {
      let {data}=await authFetch.get("/product/orders/getSingleUserOrders")
      dispatch({type:SINGLE_USER_ORDERS,payload:{orders:data.Orders}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  
  // single users orders ends

  // admin  orders starts

  const adminOrders=async ()=>{
    try {
      let {data}=await authFetch.get("/product/orders/getAllOrders")
      dispatch({type:ADMIN_ALL_ORDERS,payload:{orders:data.Orders}})
      
    } catch (error) {
      
      console.log(error.response.data.msg)
    }
    }


  // admin orders ends

  // DELETE_ORDER STARTSx
  const deleteOrder=async (id)=>{
    try {
      await authFetch.delete(`/product/orders/deleteOrder/${id}`)
      userOrders()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  // DELETE_ORDER ends

  // GET_STRIPE STARTS
  const stripe=async ()=>{
    // comment out part is for the fetch one
    try {
      const stripe = await getStripe();

      // const response = await fetch('/api/v1/create-checkout-session', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // body: JSON.stringify(state.singleUserOrders),
      //   body: JSON.stringify(state.singleUserOrders),
      // });

      const response=await authFetch.post("/create-checkout-session",{cartItems:state.singleUserOrders})
  
      if(response.statusCode === 500) return;
      
      // const data = await response.json();
  
      console.log(response)
      // toast.loading('Redirecting...');
  
      // stripe.redirectToCheckout({ sessionId:data.id });
      stripe.redirectToCheckout({ sessionId:response.data.id });
    } catch (error) {
      console.log(error)
    }
  }
  // GET_STRIPE ENDS

  // SUCCESS_OR_FAILURE_ACTIONS STARTS
  const successOrFailure=async ()=>{
    try {
     let data= await authFetch.delete("/product/orders/deleteAllOrders")
  
      // dispatch({type:SUCCESS_OR_FAILURE_ACTIONS})
    } catch (error) {
      console.log(error)
    }
  }
  // SUCCESS_OR_FAILURE_ACTIONS ENDS


  // the most commanly setups begin
  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
      const {data:{image:{src}}} = await authFetch.post("/product/uploadImage"
      
      ,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      )
      dispatch({type:UPLOAD_IMAGE,
        payload:{
          image:src
        }
      })

   
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }
  
  function changeFunction(e){
    // console.log(e.target.name,e.target.value)
    dispatch({type:HANDLE_CHANGE,
      payload:{
        name:e.target.name,
      value:e.target.value
    }})
    
  }
  
  
  
  
  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
      // allProducts()
    }

    function clearUploads(){
     dispatch({type:CLEAR_UPLOADS})
    }
    
    // the most commanly setups end
  
 
    
    
    
    

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        changepage,
  
        allUsersfun,
        updateuser,
        updateuserpassword,

        allProducts,
        clearUploads,
        createProduct, deleteProduct,
        updateProduct,
        finalUpdateProduct,

        productDetailId,
        clearReviews,

        submitReview,
        singlePersonReviews,
        deleteReview,
        updateReview,

        adminReviews,
        singleProductReviews,
        createOrder,
        userOrders,
        adminOrders,
        deleteOrder,
        stripe,
        successOrFailure,
        handleRating
        // updateReviewByAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

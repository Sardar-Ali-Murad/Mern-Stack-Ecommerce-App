import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';
// import Socket from 'socket.io-client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute, ProtectedRouteDashboard} from  "./components/index.js"
import {UpdateUser,UserDashboard,Reviews,Cart,Products,ProductDetail,UpdateReview} from "./components/userdashboard/index.js"
import Canceled from "./Canceled.js"
import Success from './Success.js'
// const Productss=React.lazy(()=>import("./components/userdashboard/Products"))

// let socket=Socket.connect()
// import {AdminDashboard,AdminReviews,AdminUsers,AdminCreateProduct,AdminProducts,UpdateProduct,AdminOrders,UpdateReviewByADMIN} from "./components/admindashboard/index"

import Register from './components/userdashboard/Register.js';

function App() {
  return (
    <div>
      <BrowserRouter>
      <React.Suspense fallback={<CircularProgress/>}>
        <Routes>
          <Route path="/landing" element={<Register/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/canceled"  element={<Canceled/>}/>
          

          <Route path="/" element={
            <ProtectedRoute>
              <UserDashboard/>
            </ProtectedRoute>
          }>
             <Route index element={<Products/>}/>
             <Route path='/updateUser' element={<UpdateUser/>}/>
             <Route path='/reviews' element={<Reviews/>}/>
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/productDetails/:productId' element={<ProductDetail/>}/>
             <Route path='/updateReview/:reviewId' element={<UpdateReview/>}/>
        </Route>


          {/* <Route path="/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }>
            <Route index element={<AdminUsers/>}/>

            <Route path="reviews" element={<AdminReviews/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path="create-product" element={<AdminCreateProduct/>}/>
            <Route path="updateProduct" element={<UpdateProduct/>}/>
            <Route path="updateReview/:reviewId" element={<UpdateReviewByADMIN/>}/>
             

        </Route> */}


          <Route path="*" element={<Error/>}/>
        </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App

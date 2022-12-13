import React from 'react'
import "./AdminDashboard.css"
import Headers from '../Headers'
import { Link, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='admin__Headers__Main'>
      <Headers/>
      <div className='admin__Overlay__Main' style={{display:"flex"}}>
        <div className='admin__Sidebar'>
         <h1 className='h__Sans'><Link to="/dashboard">Users</Link></h1>
         <h1 className='h__Sans'><Link to="/dashboard/products">Products</Link></h1>
         <h1 className='h__Sans'><Link to="/dashboard/create-product">createProduct</Link></h1>
         <h1 className='h__Sans'><Link to="/dashboard/reviews">Reviews</Link></h1>
         <h1 className='h__Sans'><Link to="/dashboard/orders">Orders</Link></h1>
       </div>
       <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard

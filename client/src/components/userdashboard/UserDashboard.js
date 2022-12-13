import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Headers from "../Headers"
import "./UserDashboard.css"
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import CloseIcon from '@mui/icons-material/Close';

const UserDashboard = () => {
  let [show,setShow]=React.useState(false)
  return (
    <div >
      <Headers/>
      <div className='user__Dashboard__Full__Overlay' style={{display:"flex",marginTop:"100px"}}>
           <div className='user__Dashboard__Navbar h__Cormorant' style={{marginRight:"20px"}}>
              <Link className='links' to="/"><Typography variant='h5' style={{color:"white",marginBottom:"70px"}}>Products</Typography></Link>
              <Link  className='links'  to="/updateUser"><Typography variant='h5' style={{color:"white",marginBottom:"70px"}}>Update User</Typography></Link>
              <Link  className='links'  to="/reviews"><Typography variant='h5' style={{color:"white",marginBottom:"70px"}}>Reviews</Typography></Link>
              <Link  className='links'  to="/cart"><Typography variant='h5' style={{color:"white",marginBottom:"70px"}}>Cart</Typography></Link>
           </div>


           <div className='small__Screen__OverLay'>
            <MenuIcon className='ham' fontSize='large'style={{cursor:"pointer"}} onClick={()=>setShow(true)}/>
            
         { show && 
             <div className='small__Screen__SideBar__Main'>
              <div className='full__OverLay'></div>

              <CloseIcon className='close' fontSize='large'style={{cursor:"pointer"}} onClick={()=>setShow(false)}/>

             <div className='small__Screen__SideBar'  style={{marginRight:"20px"}}>
              <Link onClick={()=>setShow(false)} className='links__Small' to="/"><Typography variant='h5' style={{color:"black",marginBottom:"70px"}}>Products</Typography></Link>
              <Link  onClick={()=>setShow(false)} className='links__Small'  to="/updateUser"><Typography variant='h5' style={{color:"black",marginBottom:"70px"}}>Update </Typography></Link>
              <Link  onClick={()=>setShow(false)}  className='links__Small'  to="/reviews"><Typography variant='h5' style={{color:"black",marginBottom:"70px"}}>Reviews</Typography></Link>
              <Link  onClick={()=>setShow(false)}  className='links__Small'  to="/cart"><Typography variant='h5' style={{color:"black",marginBottom:"70px"}}>Cart</Typography></Link>
           </div>
         </div>
            
         }
           </div>


          <Outlet/>
      </div>
    </div>
  )
}

export default UserDashboard

import React from 'react'
import "./Headers.css"
import { useAppContext } from '../context/appContext'
import Logo from "../Images/New Logo.png"


const Headers = () => {

    let {  logoutUser,user } = useAppContext()
    
  return (
    <div>
      <div className='post__Header'>
        <h1 className='h__Cormorant memories__h1'>
          <img src={Logo}  style={{height:"80px",width:"80px",borderRadius:"50%",marginTop:"30px"}}/>
          {/* <h1 className='h__Cormorant' style={{marginTop:"45px"}}>E-Commerence App</h1> */}
        </h1>

        <div className='header__Last__Overlay'>

          <div className='header__Circle'>
            <h1>  {user.name.charAt(0)}</h1>
          </div>

          <button className='btn' onClick={logoutUser}>Logout</button>


        </div>
      </div>
    </div>
  )
}

export default Headers

import React from 'react'
import {Navigate} from "react-router-dom"
import { useAppContext } from '../context/appContext'
import  {useNavigate} from "react-router-dom"

const ProtectedRouteDashboard = ({children}) => {
    let navigate=useNavigate()
    let {user}=useAppContext()


    // React.useEffect(()=>{
    //  if(user.role==="user"  || !user){
    //   navigate("/landing")  
    //  }
    // },[user])
   
  
      return children
  }
  

      



export default ProtectedRouteDashboard

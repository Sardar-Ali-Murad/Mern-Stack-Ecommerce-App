import { display } from '@mui/system'
import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./AdminOrders.css"


const AdminOrders = () => {
    let {adminOrders,allOrdersForAdmin}=useAppContext()
    React.useEffect(()=>{
     adminOrders()
    },[])
  return (
           <div className='all__Orders'>
      {
        allOrdersForAdmin.map((all)=>{
          return(
            <div className='single__Order' style={{background:"pink"}}>
                <div className='' style={{display:"flex",flexDirection:"column"}}>

             <p> Creator_Name:{all?.creatorName}</p> 
             <p> productQuantity:{all?.productQuantity}</p>
             <p>status:{all?.status}</p> 
           <p> totalPrice:{all?.totalPrice}</p>  
                </div>
              <p className='p__Sans'>ProductName{all.product[0]?.name}</p>
              <img src={all.product[0]?.image}/>
            </div>
          )
        })
      }
    </div>
    
  )
}

export default AdminOrders

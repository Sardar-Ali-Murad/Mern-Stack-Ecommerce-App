import { grid } from '@mui/system'
import React from 'react'
import "./AdminReviews.css"
import { useAppContext } from '../../context/appContext'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


import { Link } from 'react-router-dom';
const AdminReviews = () => {
  let { adminReviews,adminAllReviews,deleteReview}=useAppContext()
     React.useEffect(()=>{
       adminReviews()
     },[])

     function del(id){
      // console.log(id)
      deleteReview(id)
   }
    
  return (
    <div className='admin__Main'>
         {adminAllReviews.map((all)=>{
        return(
          <div className='single__Review'>
            <img src={all.product[0]?.image} style={{height:"200px"}}/>
            <p className='p__Cormorant'>Name:{all.product[0]?.name}</p>
            <p className='p__Cormorant'>Title:{all.product[0]?.title}</p>
            <p className='p__Cormorant'>Description:{all.product[0]?.description}</p>

            <h1 className='h__Sans'>Here is the review</h1>
            <p className='p__Sans'>Rating:{all.rating}</p>
            <p className='p__Sans'>Title:{all.title}</p>
            <p className='p__Sans'>Description:{all.description}</p>
            <p className='p__Sans'>createdBy:{all.creatorName}</p>

            <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
            <DeleteIcon style={{cursor:"pointer"}} onClick={()=>del(all._id)}/>
            <Link to={`/dashboard/updateReview/${all._id}`}>
                  <CreateIcon style={{cursor:"pointer"}} />
              </Link>
            </div>
          </div>

        )
       })}
    </div>
  )
}

export default AdminReviews

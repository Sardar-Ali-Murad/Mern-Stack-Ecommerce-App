
import React from 'react'
import { Link,useParams } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'
import Alert from "../Alert"


const UpdateReviewByADMIN = () => {
    let {reviewId}=useParams()
   let {singlePersonReviews,isLoading,showAlert,updateReview,reviews, adminReviews, adminAllReviews}=useAppContext()
    React.useEffect(()=>{
        singlePersonReviews()
        adminReviews()
    },[])

    let currentReview= adminAllReviews.find((all)=>all._id===reviewId) ||  []
    console.log(reviewId)

    let [data,setdata]=React.useState({
        reviewId:reviewId,
        reviewTitle:currentReview?.title,
        reviewDescription:currentReview?.description,
        reviewRating:currentReview?.rating
    })

    function handleChange(event){
        setdata((pre)=>{
            return {...pre,[event.target.name]:event.target.value}
        })
    }


    function submit(){
        updateReview({id:reviewId,title:data.reviewTitle,description:data.reviewDescription,rating:data.reviewRating})
    }

  return (
    <div>
        {showAlert && <Alert/>}
         <img style={{height:"200px"}} src={currentReview.product?currentReview?.product[0]?.image:"Loading..."}/>
        <div>
            <p className='P__Cormorant'>Rating</p>
            <input placeholder='rating' type="Number" value={data.reviewRating} name="reviewRating" onChange={handleChange}/>
        </div>
        <div>
            <p className='P__Cormorant'>Title</p>
            <input placeholder='title' name="reviewTitle" value={data.reviewTitle} onChange={handleChange}/>
        </div>
        <div>
            <p className='P__Cormorant'>Description</p>
            <input placeholder='description'  name="reviewDescription" value={data.reviewDescription} onChange={handleChange}/>
        </div>

        <button className='btn' onClick={submit}>Submit</button>
    
    <button>
       <Link to="/dashboard">Back Dashboard</Link>
    </button> 
    </div>
  )
}

export default UpdateReviewByADMIN


import React from 'react'
import { Link,useParams } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'
import Alert from "../Alert"

import Rating from '@mui/material/Rating';

import FormRow from '../admindashboard/FormRow'
import "./updateReview.css"


const UpdateReview = () => {
    let {reviewId}=useParams()
   let {singlePersonReviews,isLoading,showAlert,updateReview,reviews}=useAppContext()
    React.useEffect(()=>{
        singlePersonReviews()
    },[])

    let currentReview=reviews.find((all)=>all._id===reviewId) ||  []
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

    const [value, setValue] = React.useState(data.reviewRating);

    function submit(){
        updateReview({id:reviewId,title:data.reviewTitle,description:data.reviewDescription,rating:value})
    }


  return (
    <div className='update_Review_Mian' style={{marginTop:"40px"}}>
         <img style={{height:"200px"}} src={currentReview.product?currentReview?.product[0]?.image:"Loading..."}/>
        {showAlert && <Alert/>}
        <div>
            {/* <p className='P__Cormorant'>Rating</p>
            <input placeholder='rating' type="Number" value={data.reviewRating} name="reviewRating" onChange={handleChange}/> */}
            {/* <FormRow labelText="Rating" type="Number" value={data.reviewRating} name="reviewRating" handleChange={handleChange}/> */}
            <Rating
            name="simple-controlled"
           value={value}
           onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
        </div>
        <div>
            {/* <p className='P__Cormorant'>Title</p>
            <input placeholder='title' name="reviewTitle" value={data.reviewTitle} onChange={handleChange}/> */}

            <FormRow name="reviewTitle" value={data.reviewTitle} handleChange={handleChange} labelText=
            "Title"/>
        </div>
        <div>
            {/* <p className='P__Cormorant'>Description</p>
            <input placeholder='description'  name="reviewDescription" value={data.reviewDescription} onChange={handleChange}/> */}
            <textarea className='form form-textarea' name="reviewDescription" value={data.reviewDescription} onChange={handleChange} placeholder="Description"></textarea>
        </div>

        <button  style={{marginRight:"30px"}} className='btn' onClick={submit}>Submit</button>
    
    <button className='btn'>
       <Link style={{color:"white"}} to="/reviews">Back Home</Link>
    </button> 
    </div>
  )
}

export default UpdateReview


import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { GET_ALL_PRODUCTS_BEGIN } from '../../context/actions'
import { useAppContext } from '../../context/appContext'
import Alert from "../Alert"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from"moment"
import Rating from '@mui/material/Rating';
import FormRow from '../admindashboard/FormRow'
const ProductDetail = () => {

    let { productDetailId,
        clearReviews,
        products,
        allProducts,
        changeFunction,
        isLoading,
        reviewDescription,
        reviewRating,
        reviewTitle,
        submitReview,
        showAlert,
        singleProductReviews,
        singleProductReview,
        singleProductAverageRating,
        createOrder,
        handleRating
    }=useAppContext()

    let {productId}=useParams()

    // React.useEffect(()=>{
    // },[])
    
    React.useEffect(()=>{
        allProducts()
        productDetailId(productId)
        singleProductReviews(productId)
    },[])

    const [value, setValue] = React.useState(0);
    
    let product=products.find((all)=>all._id===productId)
    

    function handleChange(event){
        changeFunction(event)
    }

    function clear(){
        clearReviews()
    }

    function submit(){
       submitReview()
    }

    function cartbtn(){
      createOrder(productId)
    }

    function change(e){
      // console.log(e.target.value)
      setValue(e.target.value)
      handleRating(e.target.value)
    }
  return (
    <div className='detail__Product' style={{width:"100%"}}>

       <div>
       
            {/* <div>
                <img src={product?.image} style={{height:"200px"}}/>
                <h1 className='h__Cormorant'>{product?.title}</h1>
                <p className='h__Cormorant'>{product?.description}</p>
                <h4 className='h__Cormorant'>${product?.price}</h4>
                <h2>AverageRating:{singleProductAverageRating || 0}</h2>
            </div>
         */}

         <Card style={{marginTop:"40px",marginBottom:"40px",width:"80%"}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <img src={product?.image}/>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <Typography variant='h6'>${product?.price}</Typography>
                </IconButton>
              }
              title={product?.name}
              subheader={moment(product?.createdAt).format('MMMM d, YYYY')}
            />

      <CardMedia
        component="img"
        height="194"
        image={product?.image}
        alt="Paella dish"
      />
       <CardContent>
       <Typography gutterBottom variant="h5" component="div">
          {
            product?.title
          }
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {
          product?.description
         }
        </Typography>
      </CardContent>
     
      <Rating name="read-only" value={singleProductAverageRating || 0} readOnly />
         </Card>
       </div>

        {/* ) */}
       {/* })} */}
    {/* </div> */}

    <button className='btn' onClick={cartbtn} style={{marginTop:"10px",marginBottom:"30px"}}>Add to the Cart</button>

<div>
  <Card style={{padding:"10px",width:"80%"}}>


       <Typography variant='h5' className='h__Cormorant'>Leave A review</Typography>

       {showAlert && <Alert/>}

       {/* <input placeholder='title' name="reviewTitle" value={reviewTitle} onChange={handleChange}/> */}
       {/* <input placeholder='rating' type="Number" name="reviewRating" value={reviewRating} onChange={handleChange}/> */}

       <FormRow name="reviewTitle" value={reviewTitle} handleChange={handleChange} labelText="Title"/>
       {/* <FormRow name="reviewRating" value={reviewRating} handleChange={handleChange} labelText="Rating" type="Number"/> */}


       <textarea  className='form-textarea form' value={reviewDescription} placeholder="Enter The Detailed Description" onChange={handleChange} name="reviewDescription"></textarea>

       <Rating
        name="simple-controlled"
        value={value}
        onChange={change}
        style={{marginTop:"10px",marginRight:'-10px'}}
        // onChange={handleChange}
      />
      <div>
          <button className='btn' style={{marginRight:"30px"}} onClick={clear}>Clear</button>
            <button className='btn' onClick={submit}>{isLoading?"Loading...":"Submit"}</button>
      </div>
  </Card>
</div>

       {/* <div className='admin__Main'>
         {singleProductReview.map((all)=>{
        return(
          <div className='single__Review'>
          

            <h1 className='h__Sans'>Here is the review</h1>
            <p className='p__Sans'>Rating:{all.rating}</p>
            <p className='p__Sans'>Title:{all.title}</p>
            <p className='p__Sans'>Description:{all.description}</p>
            <p className='p__Sans'>createdBy:{all.creatorName}</p>

            <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
             
            </div>
          </div>
          </div> */}

          <div>
            <Card style={{marginTop:"30px",marginBottom:"30px",padding:"10px",width:"80%"}}>
              <Typography variant='h4'>Here Are Related Review</Typography>
              {singleProductReview.length<1 && <Typography variant='h6'>No Review Yet Be The First One To Do So!!</Typography>}
                {
                  singleProductReview.map((all)=>{
                    return  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {all?.creatorName.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                          <Rating name="read-only" value={all?.rating} readOnly />
                      </IconButton>
                    }
                    
                    title={all?.title}
                    subheader={all?.description}
                  />
                  })
                }
            </Card>
          </div>


<Link to="/">
      <button className='btn' >Back to home</button>
      </Link>
    </div>
  )
}

export default ProductDetail

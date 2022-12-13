import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./Reviews.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
const Reviews = () => {
  let {singlePersonReviews,reviews,deleteReview}=useAppContext()
  React.useEffect(()=>{
    singlePersonReviews()
  },[])


  function del(id){
     deleteReview(id)
  }
 

  function update(){

  }
    return (
    <div className='reviews__Main'>
       {reviews.map((all)=>{
        return(
          // <div className='single__Review'>
          //   <img src={all.product[0]?.image} style={{height:"200px"}}/>
          //   <p className='p__Cormorant'>Name:{all.product[0]?.name}</p>
          //   <p className='p__Cormorant'>Title:{all.product[0]?.title}</p>
          //   <p className='p__Cormorant'>Description:{all.product[0]?.description}</p>

          //   <h1 className='h__Sans'>Here is the review</h1>
          //   <p className='p__Sans'>Rating:{all.rating}</p>
          //   <p className='p__Sans'>Title:{all.title}</p>
          //   <p className='p__Sans'>Description:{all.description}</p>

          //   <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
          //     <DeleteIcon style={{cursor:"pointer"}} onClick={()=>del(all._id)}/>
          //     <Link to={`/updateReview/${all._id}`}>
          //         <CreateIcon style={{cursor:"pointer"}} onClick={()=>update(all._id)}/>
          //     </Link>
          //   </div>
          // </div>
          <Card className='review__Card'>


<CardMedia

        component="img"
        height="140"
        image={all.product[0].image}
        alt="green iguana"
      />

             <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {all?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {all?.description}
        </Typography>
      </CardContent>
      <CardActions><Rating name="read-only" value={all?.rating} readOnly /></CardActions>

 <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
     <DeleteIcon style={{cursor:"pointer"}} onClick={()=>del(all._id)}/>
     <Link to={`/updateReview/${all._id}`}>
         <CreateIcon style={{cursor:"pointer"}} onClick={()=>update(all._id)}/>
     </Link>
   </div>
          </Card>
          

           

          

        )
       })}
    </div>
  )
}

export default Reviews

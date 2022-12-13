import React from 'react'
import { useAppContext } from '../../context/appContext'
import './Cart.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Cart = () => {
  let {userOrders,singleUserOrders,deleteOrder,stripe}=useAppContext()
  React.useEffect(()=>{
     userOrders()
  },[])

  function remove(id){
    deleteOrder(id)
  }

  function stripeFunction(){
    stripe()
  }

  let totalPrice=0
 
 
  return (
    <div className='orders__Main' style={{width:"100%",marginTop:"20px"}}>

    <div className='all__Orders'>
      {
        singleUserOrders.map((all)=>{
          totalPrice+=all.product[0].price
          return(
      //       <div className='single__Order' style={{background:"pink"}}>
      //       <div className='' style={{display:"flex",flexDirection:"column"}}>

      //    <p> Creator_Name:{all?.creatorName}</p> 
      //    <p> productQuantity:{all?.productQuantity}</p>
      //    <p>status:{all?.status}</p> 
      //  <p> totalPrice:{all?.totalPrice}</p>  
      //       </div>
      //     <p className='p__Sans'>ProductName{all.product[0]?.name}</p>
      //     <img src={all.product[0]?.image}/>
      //     <button className='btn' onClick={()=>remove(all._id)}>Remove from cart</button>
      //   </div>

      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={all.product[0]?.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {all.product[0]?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {all.product[0]?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">${all.product[0]?.price}</Button>
        <Button size="small"  onClick={()=>remove(all._id)}>Remove from Cart</Button>
      </CardActions>
    </Card>

          )
        })
      }

    </div>
    <Typography variant='h2' style={{marginTop:"20px"}}>${totalPrice}</Typography>
      <button className='btn' onClick={stripeFunction} style={{marginTop:"30px"}}>Continue With stripe</button>
              </div>
  )
}

export default Cart

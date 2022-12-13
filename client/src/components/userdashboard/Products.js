import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./Products.css"
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import FormRow from '../admindashboard/FormRow';
import FormRowSelect from '../admindashboard/FormRowSelect';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

const Products = () => {
  let {isLoading,allProducts,products,totalProducts,changepage,sort,searchTitle,changeFunction,totalPages}=useAppContext()

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    changepage(value)
  };

  function changefun(event){
    changeFunction(event) 
  }

  React.useEffect(()=>{
    allProducts()
  },[searchTitle,sort,page])
  
  // if(isLoading){
  //   return "Loading..."
  // }

  let array=["all","price","name"]
  return (
    <div className='product__BigMain' style={{width:"100%"}}>

   <div>

      {/* <input placeholder='title' name="searchTitle" value={searchTitle} onChange={changefun}/> */}
{/* 
      <select name="sort" value={sort} onChange={changefun}>
          <option value="all">all</option>
          <option value="price">price</option>
          <option value="name">name</option>
      </select> */}
      <div style={{width:"50%"}}>
         <FormRow name="searchTitle" value={searchTitle} handleChange={changefun} labelText="Search Title" />
      </div>

      <div style={{width:"50%"}}>
        <FormRowSelect name="sort" value={sort} handleChange={changefun} list={array} labelText="Sort By The Following" />
      </div>
   </div>


      <p className='h__Cormorant'>{totalProducts} Products Found...</p>

      <div className='products__Main' style={{marginRight:"40px"}}>
         {
          products.map((all)=>{
            return(
            <Link  to={`/productDetails/${all._id}`}>
              <Card className='product__Card' sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={all?.image}
        alt="green iguana"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {all?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {all?.description.slice(0,40)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{color:"black"}}>${all?.price}</Button>
        <Link to={`/productDetails/${all._id}`}> 
           <Button size="small" style={{color:"black",zIndex:"1"}}>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
        </Link>
          )
          }
          )
         }
      </div>

      {/* <Link to={`/productDetails/${all._id}`}> */}
   {/* <div className='products__Main'> */}

      
<div className='pagination' style={{marginTop:"100px"}}>

    {totalPages!==1 &&
      <Stack spacing={2}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
    }
</div>


    </div>
    
  )
}

export default Products

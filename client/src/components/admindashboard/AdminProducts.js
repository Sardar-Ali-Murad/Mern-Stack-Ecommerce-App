import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./AdminProducts.css"
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { CLEAR_UPLOADS } from '../../context/actions';


const AdminProducts = () => {
  let {isLoading,allProducts,products,totalProducts,changepage,sort,searchTitle,changeFunction,totalPages, deleteProduct,updateProduct,clearUploads}=useAppContext()

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    changepage(value)
  };

  React.useEffect(()=>{
    clearUploads()
  },[])

  function changefun(event){
    changeFunction(event) 
  }

  React.useEffect(()=>{
    allProducts()
  },[searchTitle,sort,page])
  
   function del(id){
    deleteProduct(id)
   }

   function update(id){
    updateProduct(id)
   }
  return (
    <div style={{width:"100%"}}>

     <div>

      <input placeholder='title' name="searchTitle" value={searchTitle} onChange={changefun}/>

      <select name="sort" value={sort} onChange={changefun}>
          <option value="all">all</option>
          <option value="price">price</option>
          <option value="name">name</option>
      </select>
     </div>


      <p className='h__Cormorant'>{totalProducts} Products Found...</p>


    <div className='products__Main'>
      {products.map((all,index)=>{
        
        return <div className='single__Product' key={index}>
          <img src={all.image}/>
          <p className='h__Cormorant'>{all.title}</p>
          {/* <p className='p__Sans'>{all.description}</p> */}
          <h1 className='h__Cormorant'>${all.price}</h1>
          <div style={{display:"flex",justifyContent:'space-around',width:"100%"}}>
            <DeleteIcon style={{cursor:"pointer"}} onClick={()=>del(all._id)}/>
          <Link to="/dashboard/updateProduct">
          <EditIcon style={{cursor:"pointer"}} onClick={()=>update(all._id)}/>
          </Link> 
          </div>
          
        </div>
      })}

<div className='pagination'>

    <Stack spacing={2}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
</div>


    </div>
    </div>
  )
}

export default AdminProducts

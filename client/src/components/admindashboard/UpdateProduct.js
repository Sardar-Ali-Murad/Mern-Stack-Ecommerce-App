import React from 'react'

import { useAppContext } from '../../context/appContext'
import Alert from "../Alert"
import { Link } from 'react-router-dom'
const UpdateProduct = () => {
    let {isLoading,showAlert,editPrice,editTitle,allProducts,changeFunction,finalUpdateProduct}=useAppContext()
    React.useEffect(()=>{
      allProducts()
    },[])

    function handleChange(event){
        changeFunction(event)
    }

    function submit(){
        finalUpdateProduct()
    }
  return (
    <div>
      {showAlert && <Alert/>}

      <div className='single__Divs'>
       <h1>Price</h1>
       <input placeholder='Price' name="editPrice" onChange={handleChange} value={editPrice}/>
      </div>

      <div className='single__Divs'>
       <h1>Title</h1>
       <input placeholder='Title' name="editTitle" onChange={handleChange} value={editTitle}/>
      </div>
      
      <button className='btn' onClick={submit}>{isLoading?"Loading...":"Submit"}</button>

      <Link to="/dashboard/products">Back to Home</Link>

    </div>
  )
}

export default UpdateProduct

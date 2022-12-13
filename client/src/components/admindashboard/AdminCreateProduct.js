import Alert from "../Alert.js"
import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./AdminCreateProduct.css"
import FormRow from "./FormRow"
import FormRowSelect from "./FormRowSelect"

const AdminCreateProduct = () => {

  let {name,price,title,description,uploadImage,changeFunction,clearUploads,createProduct,isLoading,showAlert}=useAppContext()

  function handleimage(event){
    uploadImage(event)
  }

  function handleChange(event){
    changeFunction(event)
  }

  function clear(){
    let image=document.querySelector(".image")
    clearUploads()

    image.value=""
    
  }
  
  function handleSubmitProducts(){
    createProduct()
    let image=document.querySelector(".image")
    image.value=""
  }
  return (
    <div className='admin__Products__Create section__padding'>
      {showAlert && <Alert/>}
      <div className="create__Product__Wrapper">

      <div className='single__Input__Divs'>
         {/* <p>Name</p>
         <input placeholder='name' value={name} onChange={handleChange} name="name" /> */}
         <FormRow name="name" value={name} handleChange={handleChange} placeholder="Product Name..."/>
      </div>

      <div className='single__Input__Divs'>
         
         <FormRow name="title" value={title} handleChange={handleChange} placeholder="Product Title..."/>
      </div>
      <div className='single__Input__Divs'>
         {/* <p>Price</p>
         <input placeholder="price" type="Number" value={price} onChange={handleChange} name="price"/> */}
         <FormRow name="price" type="Number" value={price} handleChange={handleChange} placeholder="Product Price..."/>
      </div>
      <div className='single__Input__Divs'>
         {/* <p>Title</p>
         <input placeholder='title' value={title} onChange={handleChange} name="title"/> */}
      </div>
      <div className='single__Input__Divs' name="description">
         {/* <p>Description</p>
         <input placeholder='description' value={description} onChange={handleChange} name="description" /> */}
         <textarea className="form-textarea form" name="description" value={description} onChange={handleChange} placeholder="Enter the detailed description"></textarea>
      </div>
      <div class="form-row">
      <input type="file" id="image" accept="image/*" className="image" onChange={handleimage} />
      <div style={{marginTop:"40px"}}>
         <button className='btn' onClick={clear} style={{marginRight:"40px"}}>ClearUploads</button>
         <button className='btn' onClick={handleSubmitProducts}>{isLoading?"Addind..":"Submit"}</button>
      </div>
 </div>
      </div>
    </div>
  )
}

export default AdminCreateProduct

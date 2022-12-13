import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./updateUser.css"
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Alert from "../Alert"
import { ShowChart, ShowChartOutlined } from '@mui/icons-material';
import FormRow from '../admindashboard/FormRow';

const UpdateUser = () => {
  let { user, changeFunction, updateName, updateEmail, updatePassword,isLoading,updateuser,showAlert,updateuserpassword } = useAppContext()

  function handleChange(e) {
    changeFunction(e)
  }

  function handleUpdate() { 
     updateuser()
  }

  function hangleUpdatePassword() {
    updateuserpassword()
   }

  return (
    <div className='user__Update__Main'>
      

      <div className='user__Update__Form'>
     {showAlert && <Alert/>}
    

        <div className='form__Box'>

          {/* <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            value={updateName}
            onChange={handleChange}
            aria-describedby="component-helper-text"
            name="updateName"
          /> */}

          <FormRow value={updateName} handleChange={handleChange} name="updateName" labelText="Name"/>
        </div>

        <div className='form__Box'>
{/* 
          <InputLabel htmlFor="component-helper">Email</InputLabel>
          <Input
            id="component-helper"
            value={updateEmail}
            onChange={handleChange}
            aria-describedby="component-helper-text"
            name="updateEmail"
          /> */}

        <FormRow name="updateEmail" handleChange={handleChange} value={updateEmail} labelText="Email"/>
        </div>
        <button onClick={handleUpdate} className="btn">{isLoading?"Loading...":"Submit"}</button>
      </div>

      <div className='update__User__Password'>


        <div className='form__Box__Update'>

          {/* <InputLabel htmlFor="component-helper">Update Password</InputLabel>
          <Input
            id="component-helper"
            value={updatePassword}
            onChange={handleChange}
            aria-describedby="component-helper-text"
            name="updatePassword"
          /> */}

          <FormRow name="updatePassword" value={updatePassword} handleChange={handleChange} labelText="Change Passsowrd"/>
        </div>


        <button className="btn" onClick={hangleUpdatePassword}>{isLoading?"Updating":"Submit"}</button>


      </div>


    </div>
  )
}

export default UpdateUser

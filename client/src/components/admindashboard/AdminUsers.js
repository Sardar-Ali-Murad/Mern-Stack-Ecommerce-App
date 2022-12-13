import React from 'react'
import { useAppContext } from '../../context/appContext'
import "./AdminUsers.css"

const AdminUsers = () => {
  let {allUsers,allUsersfun}=useAppContext()
  React.useEffect(()=>{
    allUsersfun()
  },[])

  return (
    <div className='section__padding'>

      <div className='users__Wrapper'>

      {
        allUsers.map((all)=>{
          return <div className='single__User'>
            <p className='h__Cormorant'>UserName:{all.name}</p>
            <p className='h__Cormorant'>UserEmail:{all.email}</p>
            <p className='h__Cormorant'>UserRole:{all.role}</p>
            <p className='h__Cormorant'>UserId:{all._id}</p>
          </div>
        })
      }
      </div>


    </div>
  )
}

export default AdminUsers

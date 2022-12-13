import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from './context/appContext'

const Success = () => {
    let { successOrFailure}=useAppContext()
    React.useEffect(()=>{
        successOrFailure()
    },[])
  return (
    <div>
      <p>Your order is delivered successfully </p>
      <Link to="/"><button >Shop Again</button></Link>
    </div>
  )
}

export default Success

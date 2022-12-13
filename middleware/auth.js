import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'
import User from "../models/Auth.js"

UnAuthenticatedError
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }
    
    console.log(req.user.userId)


    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {

     let currentUser= User.findOne({_id:req.user.userId})

    if (!roles.includes(currentUser.role)) {
      throw new UnAuthenticatedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

export {
  auth,authorizePermissions
}

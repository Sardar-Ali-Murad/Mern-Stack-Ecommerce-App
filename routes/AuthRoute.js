import express, { Router } from "express"
let router=express.Router()
import {auth} from  "../middleware/auth.js"

import {Login,Register,getAllUsers,updateUser,updateUserPassword} from "../controllers/Users.js"

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/").get(auth,getAllUsers)
router.route("/updateUser").patch(auth,updateUser)
router.route("/updateUserPassword").patch(auth,updateUserPassword)


export default router
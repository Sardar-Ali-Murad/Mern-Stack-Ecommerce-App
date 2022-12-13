import express from "express"
let router=express.Router()
import {getStripe} from "../controllers/StripeController.js"

router.route("/create-checkout-session").post(getStripe)
export default router
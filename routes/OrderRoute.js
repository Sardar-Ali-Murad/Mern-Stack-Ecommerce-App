import express from "express"
let router=express.Router()
import {createOrder,updateOrder,getAllOrders,getSingleUserOrders,deleteOrder,deleteAllOrders} from "../controllers/OrderController.js"

router.route("/createOrder").post(createOrder)
router.route("/getSingleUserOrders").get(getSingleUserOrders)
router.route("/getAllOrders").get(getAllOrders)
router.route("/deleteAllOrders").delete(deleteAllOrders)

router.route("/updateOrder/:id").patch(updateOrder)
router.route("/deleteOrder/:id").delete(deleteOrder)

export default router
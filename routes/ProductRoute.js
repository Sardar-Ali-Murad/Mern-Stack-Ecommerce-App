import express from "express"
let router=express.Router()

import {createProduct,getAllProduct,updateProduct,deleteProduct,singleProductReviews} from "../controllers/ProductController.js"
import uploadImage from "../controllers/UploadImage.js"
import {auth,authorizePermissions} from "../middleware/auth.js"

// router.route("/").post([auth,authorizePermissions("admin")],createProduct).get(getAllProduct)
router.route("/").post(auth,createProduct).get(getAllProduct)

router.route("/:id").patch(auth,updateProduct).delete(auth,deleteProduct)

router.route("/singleProductReview/:id").get(auth,singleProductReviews)


router.route("/uploadImage").post(auth,uploadImage)

export default router
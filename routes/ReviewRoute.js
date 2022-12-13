
import express from "express"

let router=express.Router()

import {
   createReview,
   getAllReviews,
   getSingleUserReview,
   updateReview,
   deleteReview,

   updateReviewByAdmin
} from "../controllers/ReviewsController.js"

router.route("/").post(createReview)
router.route("/getSingleUserReviews").get(getSingleUserReview)
router.route("/getAllReviews").get(getAllReviews)
router.route("/:id").patch(updateReview).delete(deleteReview)
router.route("/updateByAdmin/:id").patch(updateReviewByAdmin)

export default router

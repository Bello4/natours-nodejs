const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');


const router = express.Router({ mergeParams: true });

// we use merge in orther to let review route kown tour route will call it's route
// so if we have POST /tour/234dhfh/reviews or 
// POST /reviews  it will still work

router.use(authController.protect);

router
.route('/')
.get(reviewController.getAllReviews)
.post(authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview);

router
.route('/:id')
.get(reviewController.getReview)
.patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
.delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);
module.exports = router;
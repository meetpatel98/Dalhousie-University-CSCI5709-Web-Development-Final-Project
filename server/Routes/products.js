/**
 *   @author : Meet Patel (B00899516) 
 *   @description : Node js backend application file which map http request with the associated 
 *    routes to process request.
 */

const router = require("express").Router();
let Review = require("../Models/review.model");
let OwnerReview = require("../Models/ownerReview.model");

// Show Product Reviews
router.route('/:id').get((req, res) => {
    Review.find(
        {
            productId: req.params.id
        })
    .then(review => res.json(review))
    .catch(err => res.status(400).json('Error: '+err));
 });

 router.route('/find/:id').get((req, res) => {
    Review.find(
        {
            _id: req.params.id
        })
    .then(review => res.json(review))
    .catch(err => res.status(400).json('Error: '+err));
 });



//Insert Product Review
router.route('/:id/review/createproductreview').post((req,res) => {
    const productId = req.params.id;
    const userName = req.body.userName;
    const reviewRating = req.body.reviewRating;
    const reviewTitle = req.body.reviewTitle;
    const reviewDescription = req.body.reviewDescription;
    const reviewDate = Date.now();
    const newReview = new Review({productId, userName, reviewRating, reviewTitle, reviewDescription, reviewDate});
    newReview.save()
    .then(() => res.json('Review Posted!'))
    .catch(err => res.status(400).json('Error: '+err));
});


// Insert Review for Owner
router.route('/:id/review/createownerreview').post((req,res) => {
    const productId = req.params.id;
    const userName = req.body.userName;
    const reviewRating = req.body.reviewRating;
    const reviewTitle = req.body.reviewTitle;
    const reviewDescription = req.body.reviewDescription;
    const reviewDate = Date.now();
    const newReview = new OwnerReview({productId, userName, reviewRating, reviewTitle, reviewDescription, reviewDate});
    newReview.save()
    .then(() => res.json('Review Posted!'))
    .catch(err => res.status(400).json('Error: '+err));
});





//Insert Product Review
router.route('/:id/review/updateproductreview').put((req,res) => {
    Review.findById(req.params.id)
    .then( review => {
        review.reviewRating = req.body.reviewRating;
        review.reviewTitle = req.body.reviewTitle;
        review.reviewDescription = req.body.reviewDescription;
        review.reviewDate = Date.now();
        review.save()
        .then(() => res.json('Review Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});








module.exports = router;
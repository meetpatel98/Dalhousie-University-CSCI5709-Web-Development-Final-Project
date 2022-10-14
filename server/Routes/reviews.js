/**
 *   @author : Meet Patel (B00899516)
 *   @description : Node js backend application file which map http request with the associated
 *    routes to process request.
 */

const router = require("express").Router();
let Review = require("../Models/review.model");
let OwnerReview = require("../Models/ownerReview.model");

router.route("/").get((req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Show Reviews of Particular Person only
router.route("/:id").get((req, res) => {
  Review.find({
    userName: req.params.id,
  })
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/owner/:id").get((req, res) => {
  console.log("kghreiugh");
  OwnerReview.find({
    userName: req.params.id,
  })
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

//To Delete The Review
router.route("/:id").delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      review.reviewRating = req.body.reviewRating;
      review.reviewTitle = req.body.reviewTitle;
      review.reviewDescription = req.body.reviewDescription;
      review.reviewDate = Date.now();
      review
        .save()
        .then(() => res.json("Review Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

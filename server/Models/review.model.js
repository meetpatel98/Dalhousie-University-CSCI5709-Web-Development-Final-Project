/**
 *   @author : Meet Patel (B00899516)
 *
 *   @description : a user model to define the structure of the Product Reviews.
 */

const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    userName: String,
    reviewRating: Number,
    reviewTitle: String,
    reviewDescription: String,
    productId: String,
    reviewDate: {  type : Date, default: Date.now }
  });
  
  module.exports = Review;
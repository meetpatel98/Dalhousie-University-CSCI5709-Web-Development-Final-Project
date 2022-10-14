
/**
 *   @author : Meet Patel (B00899516)
 */

/**
 *   @description : a user model to define the structure of the Product Owner Review Reviews.
 */


const mongoose = require('mongoose');

const OwnerReview = mongoose.model('OwnerReview', {
    userName: String,
    reviewRating: Number,
    reviewTitle: String,
    reviewDescription: String,
    productId: String,
    reviewDate: {  type : Date, default: Date.now }
  });
  
  module.exports = OwnerReview;
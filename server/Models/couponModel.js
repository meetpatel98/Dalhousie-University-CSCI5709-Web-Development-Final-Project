/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : a coupon model to define the schema of coupons added on the product
 */

const mongoose = require("mongoose");

//schema defined for collection "coupondetails" in the Mongodb database
const CouponSchema = mongoose.Schema({
  couponId: { type: String },
  code: { type: String },
  coupon_type: { type: String },
  description: { type: String },
  expiry_date: { type: String },
  coupon_amount: { type: Number },
});

const CouponDetails = mongoose.model("coupondetails", CouponSchema);

module.exports = CouponDetails;

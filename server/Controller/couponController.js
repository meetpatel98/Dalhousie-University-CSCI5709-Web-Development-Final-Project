/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : This file contains business logic for getting the data from form
 *                  and adding the coupon to the database
 */

const CouponDetails = require("../Models/couponModel.js");

//business logic for adding coupon

const AddCoupon = async (req, res) => {
  //random id will be generated for each coupon
  let couponid = Math.random().toString().substring(2, 8);

  console.log(couponid);

  await CouponDetails.create({
    couponId: couponid,
    code: req.body.code,
    coupon_type: req.body.coupon_type,
    description: req.body.description,
    expiry_date: req.body.expiry_date,
    coupon_amount: req.body.coupon_amount,
  });

  res.status(200).json({
    couponAdded: true,
    couponData: "Coupon added succesfully",
  });
};

module.exports = { AddCoupon };

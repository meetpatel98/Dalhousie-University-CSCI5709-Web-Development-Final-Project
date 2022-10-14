/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : routes defined to map the user request.
 */

const express = require("express");

const { AddCoupon } = require("../Controller/couponController.js");

const couponRouter = express.Router();

couponRouter.post("/addcoupon", AddCoupon);

module.exports = couponRouter;

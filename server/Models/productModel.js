// @version 1.0 @author [Tirth Patel(tr326604@dal.ca)

// const express = require("express");
const mongoose = require("mongoose");

//product schema
const productSchema = new mongoose.Schema({

  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  productimage:{
    type: String,
    required: true,
  },
  description:
  {
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  rentamount: {
    type: Number,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  securitydeposit:{
    type: Number
  },
  availablefordays:{
    type: Number,
    required: true,
  },
  couponid:{
    type: Number
  },
  userid:{
    type: Number,
    required: true,
  },
  review:{
    type: String
  }

});

//creating collections(model is used to create collection)
const Product = new mongoose.model("productDetails", productSchema);

//inserting data manually

module.exports = Product;
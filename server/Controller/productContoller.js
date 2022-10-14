/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : This file contains business logic for getting the data from form
 *                  and adding the product to the database
 */

const ProductDetails = require("../Models/productModel.js");
const userModel = require("../Models/userModel.js");

//business logic for adding product

const AddProduct = async (req, res) => {
  //random id will be generated for each product

  let product_id = Math.random().toString().substring(2, 10);
  await ProductDetails.create({
    userid: req.body.userid,
    id: product_id,
    name: req.body.name,
    description: req.body.description,
    productimage: req.body.productimage,
    category: req.body.category,
    quantity: req.body.quantity,
    rentamount: req.body.rentamount,
    address: req.body.address,
    securitydesposit: req.body.securitydesposit,
    availablefordays: req.body.availablefordays,
    coupon_type: req.body.coupon_type,
  });
  res.status(200).json({
    productAdded: true,
    message: "Product added succesfully",
  });
};

const product = require("../Models/productModel");

const getProducts = async (req, res) => {

  const docId = req.params.userid;
  console.log("User id is");
  console.log(docId);

  //Get userpreference for login user
  const user = await userModel.findOne({
    _id: docId
  });

  let usePreferenceArray = user.userPreference;

  console.log("user preference array is");
  console.log(usePreferenceArray);
  console.log("user preference array length  is");
  console.log(usePreferenceArray.length);

  if (usePreferenceArray.length == 1 && usePreferenceArray[0]==='') {

    product
      .find()

      .then((productRecord) => {

        console.log("product records is");
        console.log(productRecord);

        return res.status(200).json({ success: true, productRecord: productRecord });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, message: err });
      });
  } else {

    let prodResArray = [];

    for(let i=0; i<usePreferenceArray.length;i++) {
      const pref = usePreferenceArray[i];
      const list = await ProductDetails.find({
        category: pref
      })
      prodResArray = prodResArray.concat(list);
    }

    // usePreferenceArray.forEach((preference) => {

    //   //Get userpreference for login user
    //    ProductDetails.find({
    //     category: preference
    //   }).then((productList)=>{

    //     console.log("product list is");
    //     console.log(productList);

    //     prodResArray=prodResArray.concat(productList);
    //   }).catch(()=>{
    //     console.log("Error while retrieving prdoucts according to user preference");
    //   });
      
    // });

    console.log("product response array is");
    console.log(prodResArray);

    return res.status(200).json({ success: true, productRecord: prodResArray });
  }


};

//This API will fetch the  particular product(Here Medicine) based on given productid in params.
const getProduct = async (req, res) => {
  product
    .findById({ _id: req.params.id })
    .then((productRecord) => {
      res.status(200).json({ success: true, productRecord });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err });
    });
};


module.exports = { AddProduct, getProduct, getProducts };

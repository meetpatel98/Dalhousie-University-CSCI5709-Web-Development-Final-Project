/**
 *
 * @version 1.0
 * @author [Tirth Patel] (tr326604@dal.ca)(BannerID:-B00890745)
 */

//This API will fetch all the products(Here Medicines) from the database
const product = require("../Models/productModel");

const getProducts = async (req, res) => {
  product
    .find()

    .then((productRecord) => {
      
     return res.status(200).json({ success: true, productRecord: productRecord });
    })
    .catch((err) => {
     return res.status(400).json({ success: false, message: err });
    });
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

module.exports = { getProducts, getProduct };
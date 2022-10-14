/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : routes defined to map the user request.
 */

const express = require("express");

const { AddProduct,getProduct, getProducts } = require("../Controller/productContoller");

const productRouter = express.Router();

productRouter.post("/addproducts", AddProduct);
productRouter.get("/products/:userid", getProducts);
productRouter.get("/product/:id", getProduct);


module.exports = productRouter;

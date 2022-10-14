/**
 *   @author : Vivekkumar Patel (B00874162) C\
 *   @description : Node js backend application main file which map http request with the associated
 *    routes to process request.I have created base architecture of the application.
 */

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const dbConnection = require("./DbConnection/dbconnection.js");
const userRouter = require("./Routes/userRoutes.js");
const orderRoutes = require("./Routes/orderRoutes");
const postsRoutes = require("./Routes/postsRoutes.js");
const messagingRoutes = require("./Routes/messagingRoutes.js");
const couponRouter = require("./Routes/couponRoutes.js");
const productRouter = require("./Routes/productRoutes.js");
// const product_Router= require("./Routes/product_route")

const couponModel = require("./Models/couponModel.js");
// const productModel = require("./Models/");

const PORT = process.env.PORT || 8080;

const reviewsRouter = require("./Routes/reviews");
const productsRouter = require("./Routes/products");


dbConnection();

const appParent = "/unitedrental/";

app.use(appParent + "userdetails", userRouter);
app.use(appParent + "billingdetails", orderRoutes);
app.use(appParent, postsRoutes);
app.use(appParent, messagingRoutes);
app.use(appParent + "review", reviewsRouter);
app.use(appParent + "product", productsRouter);
app.use(appParent + "coupondetails", couponRouter);
app.use(appParent + "productdetails", productRouter);
// app.use(product_Router)


app.get("/", (req, res) => {
  res.send("Application is up successfully");
});

app.post(appParent + "addcoupon", async (req, res) => {
  let coupon = new couponModel(req.body);
  let result = await coupon.save();
  res.send(result);
});

// app.post(appParent + "addproducts", async (req, res) => {
//   let coupon = new couponModel(req.body);
//   let result = await coupon.save();
//   res.send(result);
// });

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});

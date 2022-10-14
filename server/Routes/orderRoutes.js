const app=require("express");

const orderRouter = app.Router();
const {addDataToDatabase} = require("../Controller/orderController.js")

orderRouter.post('/saveordertodb' , addDataToDatabase )

module.exports=orderRouter;
const mongoose = require("mongoose");

 const collection = mongoose.Schema({
     useId: { type: String },
     orderId: {type: String},
     address: {type: String},
     product: {
         productIdArr: [String],
         priceArr: [String],
         quantity: [String]
     },
     totalprice: {type: Number}
 })

  const orderDetails = mongoose.model("orderdetails", collection);
  
  module.exports = orderDetails;
/**
 *   @author : Vivekkumar Patel (B00874162)
 */

/**
 *   @description : a jsontoken model to store information of active and inactive json tokens.
 */


 const mongoose = require("mongoose");

 const collection = mongoose.Schema({
    token: { type: String },
    status: { type: String, required: true }
  });

  const JsonTokens = mongoose.model("jsontokens", collection);
  
  module.exports = JsonTokens;
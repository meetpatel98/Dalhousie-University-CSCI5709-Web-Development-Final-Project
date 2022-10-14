/**
 *   @author : Vivekkumar Patel (B00874162)
 */

/**
 *   @description : a user model to define the structure of the user information.
 */


 const mongoose = require("mongoose");

 const collection = mongoose.Schema({
    useId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    pswd: { type: String, required: true },
    address: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    codeToVerify: { type: String, required: true },
    userPreference:[{ type: String }],
    profileImage: { type: String },
    resetPswdCode: { type: String }
  });

  const UserDetails = mongoose.model("userdetails", collection);
  
  module.exports = UserDetails;
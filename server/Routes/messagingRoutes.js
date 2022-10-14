/**
 *   @author : Rushi Patel (B00886157)
 *   @description : routes to map messaging application http request.
 */


 const express=require("express");

 const authenticateUser=require("../Middleware/authenticate.js");
 const {sendEmailToOwner,contactUsEmail}=require("../Controller/messagingController.js");
 
 const messagingRouter = express.Router();
 
 //HTTP post request to register user map to registerUser function.
 messagingRouter.post('/sendMessageToOwner', sendEmailToOwner);
 messagingRouter.post('/contactUsEmail', contactUsEmail);

 
 module.exports=messagingRouter;
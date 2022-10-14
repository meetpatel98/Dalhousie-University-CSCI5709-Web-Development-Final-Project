//Code has been refered form this url https://nodemailer.com/about/

/**
 *   @author : Rushi Patel (B00886157)
 *   @description:Set email configuration to send an email from gmail account
 */

 const emailConfig = require("nodemailer");

 const emailSender = emailConfig.createTransport({
     service: "gmail",
     auth: {
       user: "takeonrent95@gmail.com",
       pass: "kxrwwbmhukpjpydf",
     },
   });
 
   module.exports=emailSender;
 

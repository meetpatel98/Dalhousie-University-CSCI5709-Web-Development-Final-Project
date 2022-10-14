/**
 *   @author : Vivekkumar Patel (B00874162)
 *  @description: Middleware to check user is authenticated or not.
 */

 const userModel = require("../Models/userModel");
 const tokenModel = require("../Models/jsonTokens");
 const jwtObject = require("jsonwebtoken");

const authenticateUser=async(req,res,next)=>{

    let headerData=req.headers.authorization;

    console.log("token data is");
    console.log(headerData);

    if (!headerData) {
        return res.status(401).json({ resMsg: "Token is invalid" });
      } else {

      let tokenArray=headerData.split(" ");

      console.log("Token array is");
      console.log(tokenArray[1]);
      
        const jsonToken = await tokenModel.findOne({
          token: tokenArray[1]
      });

      if(!jsonToken){
        return res.status(401).json({ resMsg: "Token is invalid" });
      }


      if(jsonToken.status==="INACTIVE"){
        return res.status(401).json({ resMsg: "Token is inactive" });
      }

        const tokenData = req.headers.authorization.split(" ")[1];
        
        let key="unitedRental";
        let decryptedData = jwtObject.verify(tokenData, key);

        let userId=decryptedData?.userId;

        if ( !userId) {
            return res.status(401).json({ resMsg: "User is unauthorized" });
        } else {
          const userData = await userModel.findOne({ useId: userId });

          if (!userData)
            return res.status(401).json({ resMsg: "User is unauthorized" });
          next();
        }
      }

};

module.exports=authenticateUser;
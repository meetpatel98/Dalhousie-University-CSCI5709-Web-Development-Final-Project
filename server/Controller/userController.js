/**
 *   @author : Vivekkumar Patel (B00874162)
 *   @description: userController handle business logic related to verify user account, save user details 
 *                  and preference 
 *   https://docs.nestjs.com/security/encryption-and-hashing
 * https://www.loginradius.com/blog/engineering/hashing-user-passwords-using-bcryptjs/
 */

const userModel = require("../Models/userModel.js");
const tokenModel = require("../Models/jsonTokens");
const json = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const composeEmail = require("../mail/mailFormat.json");
const emailSender = require("../mail/emailConfig");

const registerUser = async (req, res) => {

    const userDetails = req.body.userdata;

    console.log(userDetails);

    //business logic comes here to register user
    let userid = Math.random().toString().substring(2, 8);
    const payload = userid + userDetails.email;

    const verifiCode = json.sign({
        payload
    }, "unitedrental");

    try {

        await userModel.create({
            useId: userid,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            emailAddress: userDetails.email,
            mobileNo: userDetails.mobileNo,
            pswd: userDetails.pswd,
            address: userDetails.address,
            isAccountVerified: false,
            codeToVerify: verifiCode,
            userPreference: "",
            profileImage: null,
            resetPswdCode: ""
        });


        //Send verification email 
        composeEmail.from = "unitedrental@gmail.com";
        composeEmail.to = userDetails.email;
        composeEmail.subject = "United Rental Account Verification";
        //composeEmail.html = `Your account registered succesfully.Please verify your email using this link <a href=https://62d338f7f459cd590b10d756--iridescent-muffin-16a9fd.netlify.app/verifyaccount/${verifiCode}>Click here</a>`
        composeEmail.html = `Your account registered succesfully.Please verify your email using this link <a href=https://take-on-rent.netlify.app/verifyaccount/${verifiCode}>Click here</a>`
        console.log(composeEmail);

        //Send an email
        emailSender.sendMail(composeEmail, function (err, info) {

            if (err) {

                console.log(err);
                res.status(400).json({
                    userRegister: true,
                    message: "Error while sending verification email"
                });
            } else {

                res.status(200).json({
                    userRegister: true,
                    message: "User registered succesfully.Please verify account."
                });
            }

        });


    } catch (err) {

        console.log(err);

        res.status(400).json({
            userRegister: false,
            message: "Error while registering user"
        });
    }

};


const checkUserRegistered = async (req, res) => {

    const emailAddress = req.body.email;

    const isUserExist = await userModel.findOne({
        emailAddress: emailAddress
    });

    console.log("Is user exist");
    console.log(isUserExist);

    if (isUserExist) {

        console.log("inside if");
        res.status(200).json({
            userexist: true
        });



    } else {
        console.log("inside else");
        res.status(200).json({
            userexist: false
        });


    }
};




const verifyUserAccount = async (req, res) => {

    //business logic comes here to verify user account
    const dataToBeVerified = req.body.verificationData;


    const isUserExist = await userModel.findOne({
        emailAddress: dataToBeVerified.email,
        codeToVerify: dataToBeVerified.tokenString
    });



    if (isUserExist) {
        console.log("Inside if");
        isUserExist.isAccountVerified = true;
        await isUserExist.save();
        res.status(200).json({
            userVerified: true,
            message: "User account verified succesfully."
        });

    } else {
        res.status(200).json({
            userVerified: false,
            message: "User account has not been registerd with given email address"
        });
    }

};


const signin = async (req, res) => {

    const credentials = req.body.signindata;

    const isUserExist = await userModel.findOne({
        emailAddress: credentials.email
    });

    console.log(credentials);
    if (isUserExist) {

        if (isUserExist.isAccountVerified) {

            const isPswdMatch = await bcrypt.compare(
                credentials.password,
                isUserExist.pswd
            );

            if (isPswdMatch) {

                const jwtToken = json.sign(
                    { userId: isUserExist.useId },
                    "unitedRental",
                    { expiresIn: "1h" }
                );


                await tokenModel.create({
                    token: jwtToken,
                    status: "ACTIVE",
                });

                res.status(200).json({
                    userLogin: true,
                    message: "Login succesful",
                    token: jwtToken,
                    userDetails: isUserExist
                });

            } else {
                res.status(200).json({
                    userLogin: false,
                    message: "Invalid credentials"
                });
            }


        } else {
            res.status(200).json({
                userLogin: false,
                message: "User account is not verified yet please verify account."
            });
        }
    } else {
        res.status(200).json({
            userLogin: false,
            message: "User is not registered with given email address"
        });
    }

};


const getDataByUserId = async (req, res) => {

    const userId = req.body.userId;

    console.log(userId);


    const user = await userModel.findOne({
        useId: userId
    });

    const dataToBeSend={
        firstName:user.firstName,
        lastName:user.lastName,
        mobileNo:user.mobileNo,
        address:user.address,
        profileImage:user.profileImage,
        userPreference:user.userPreference.toString(),
        _id:user._id
    }

//    console.log(user);

    res.status(200).json({
        userData: dataToBeSend
    });

}


const updateProfileDetails = async (req, res) => {

    const profileDetails = req.body;

    const _id = { _id: profileDetails.documentId };

    let preferenceArray=[];

    console.log("Preference");
    console.log(profileDetails.userPreference);

    preferenceArray=profileDetails.userPreference.split(",");
    console.log("Preference array is");
    console.log(preferenceArray);


    const fieldsTobeUpdate = {
        firstName: profileDetails.firstName,
        lastName: profileDetails.lastName,
        mobileNo: profileDetails.mobileNo,
        address: profileDetails.address,
        profileImage: profileDetails.profileImage,
        userPreference:preferenceArray
    }

    console.log("Details to be update");
    console.log(fieldsTobeUpdate);


    const updatedUserDetails = await userModel.findByIdAndUpdate(
        _id,
        { ...fieldsTobeUpdate },
        { new: true }
    );


    res.status(200).json({
        updatedUserData: updatedUserDetails
    });

}


const sendResetPasswordLink = async (req, res) => {

    const {email} = req.body;

    console.log("emial id");
    console.log(email);

    const isUserExist = await userModel.findOne({
        emailAddress: email
    });

    if (!isUserExist) {

      return  res.status(200).json({
            linkSend: false,
            message: "User is not registered with the given email address."
        });
    }

    const payload = isUserExist.useId + isUserExist.emailAddress + isUserExist.codeToVerify;

    const resetPswdCode = json.sign({
        payload
    }, "unitedrental");



    const _id = { _id: isUserExist._id };

    const fieldsTobeUpdate = {
        resetPswdCode: resetPswdCode
    }

    const updatedUserDetails = await userModel.findByIdAndUpdate(
        _id,
        { ...fieldsTobeUpdate },
        { new: true }
    );


    //Send verification email 
    composeEmail.from = "unitedrental@gmail.com";
    composeEmail.to = email;
    composeEmail.subject = "United Rental Reset Pasword Link";
    //composeEmail.html = `To reset password please click on this link<a href=https://62d338f7f459cd590b10d756--iridescent-muffin-16a9fd.netlify.app/resetpassword/${resetPswdCode}>Click here</a>`
    composeEmail.html = `To reset password please click on this link<a href=https://take-on-rent.netlify.app/resetpassword/${resetPswdCode}>Click here</a>`
    console.log(composeEmail);

    //Send an email
    emailSender.sendMail(composeEmail, function (err, info) {

        if (err) {

            console.log(err);
            res.status(400).json({
                linkSend: false,
                message: "Error while sending verification email"
            });
        } else {

            res.status(200).json({
                linkSend: true,
                message: "Reset password link has been send succesfully."
            });
        }

    });

}

const resetPassword = async (req, res) => {

    const resetPswdData=req.body;

    console.log(resetPswdData);
    
    const isUserExist = await userModel.findOne({
        emailAddress:resetPswdData.resetPswdData.email,
        resetPswdCode:resetPswdData.resetPswdData.code
    });

    console.log(isUserExist);

    if (!isUserExist) {

      return  res.status(200).json({
            pswdReset: false,
            message: "User is not registered with the given email address."
        });
    }


    const _id = { _id: isUserExist._id };

    const fieldsTobeUpdate = {
        pswd: resetPswdData.resetPswdData.newpassword
    }

    const updatedUserDetails = await userModel.findByIdAndUpdate(
        _id,
        { ...fieldsTobeUpdate },
        { new: true }
    );

    return  res.status(200).json({
        pswdReset: true,
        message: "Password has been changed succesfully."
    });

}

const signout = async (req, res) => {

    const token = req.body.token;

    console.log("In signout");
    console.log(token);

    const jsonToken = await tokenModel.findOne({
        token: token,
        status:"ACTIVE"
    });

    const _id = { _id: jsonToken._id };

    const fieldsTobeUpdate = {
        token: jsonToken.token,
        status:"INACTIVE"
    }


    const updateTokenDetails = await tokenModel.findByIdAndUpdate(
        _id,
        { ...fieldsTobeUpdate },
        { new: true }
    );

    return  res.status(200).json({
        tokenDeactivated: true,
        message: "Json Token has been deactivated."
    });
};





module.exports = {
    registerUser,
    verifyUserAccount,
    checkUserRegistered,
    signin,
    getDataByUserId,
    updateProfileDetails,
    sendResetPasswordLink,
    resetPassword,
    signout
};
4
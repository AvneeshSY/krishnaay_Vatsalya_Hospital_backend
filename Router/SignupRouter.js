const express = require('express');
const router = express.Router();
const SignupController=require("../Controller/SignupController.js");
const {LoginController}=require("../Controller/LoginController.js")
const sendOTP =require("../Utils/OTPgenerator.js");
const verifyotp=require("../Utils/OTPgenerator.js")

router.post("/signup",SignupController.registerUser);
router.post("/login",LoginController.loginUser)
router.post("/send-otp",sendOTP.sendOtp)
router.post("/verify-otp", verifyotp.verifyOtp);

module.exports = router;

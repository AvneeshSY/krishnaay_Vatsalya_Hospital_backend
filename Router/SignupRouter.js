const express = require('express');
const router = express.Router();
const SignupController=require("../Controller/SignupController.js");
const {LoginController}=require("../Controller/LoginController.js")

router.post("/signup",SignupController.registerUser);
router.post("/login",LoginController.loginUser)

module.exports = router;

const SignupModal = require("../Modal/SignupModal.js");


const bcrypt= require("bcryptjs")

const registerUser=async(req,res)=>{

    try{
        const {first_name,last_name,email,password,role,profile_complete,specialization}=req.body;
        console.log("error Avneesh")
        const existingUser=await SignupModal.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists with this email"
            })
        }
        console.log("error Avneesh")
        const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const user = new SignupModal({
        first_name,
        last_name,
        email,
        specialization:specialization || null,
        password: hashedPassword,
        role,
       
      });
      console.log("error Avneesh")
      const savedUser = await user.save();
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: savedUser._id,
          email: savedUser.email,
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
          role: savedUser.role,
          specialization: savedUser.specialization,
          password:savedUser.password
          
        },
      });


    }catch(err){
        res.status(500).json({
            message:"Internal server error Avneesh",
            error:err.message
        })
    }
}
module.exports = {
    registerUser,
  };
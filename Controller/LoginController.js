const signupSchema = require("../Modal/SignupModal")
const bcrypt = require("bcryptjs")
const LoginController = {
    loginUser: async (req, res) => {
        try {
            console.log("Login attempt by:", req.body);
            const { email, password } = req.body;
            console.log("Login attempt by:", req.body);
            const user = await signupSchema.findOne({ email: email });
            if (!user) {
                return res.status(400).json({
                    message: "user not found this email"
                })
            }
            const isMatch =await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({
                    message:"Invalid Password"

                })
            }
            return res.status(201).json({
                message:"user Login Successfully",
                user:{
                    id:user._id,
                    email:user.email,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    role:user.role,
                    profile_compplete:user.profile_complete,
                    status:user.status
                }
            })
        }catch(err){
            res.status(500).json({
                message:"Internal server error",
                error:err.message
            })
        }
    }
}
module.exports={
    LoginController
}
// const { find } = require("../Modal/SignupModal.js");
const specialization = require("../Modal/Specialization.js");
const Speciliezeduser =require("../Modal/SignupModal.js")

const specializationController = {


    addSpecialization: async (req, res) => {
        try {
            const { specialization_name } = req.body;
            if (!specialization_name) {
                return res.status(400).json({
                    success: false,
                    message: "Specialization name is required"
                })
            }
            const isSpecializationExists = await specialization.findOne({ specialization_name });
            if (isSpecializationExists) {
                return res.status(400).json({
                    success: false,
                    message: "Specialization already exists"

                })
            }
            const newSpecialization = new specialization({
                specialization_name
            })
            const savedSpecialization = await newSpecialization.save();
            return res.status(201).json({
                success: true,
                message: "Specialization added successfully",
                specialization: savedSpecialization
            })
        }
        catch (error) {
            console.error("Error adding specialization ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error While adding specialization",
                error: error.message
            })
        }
    }
    ,   
    getAllSpecializations: async (req, res) =>{
        try {
            const getSpecializations= await specialization.find()
            return res.status(200).json({
              success:true,
              message:"dat retreive successfully",
              data:getSpecializations
              
            })
            
        } catch (error) {
            console.log("Error fetch specializations", error)
           return res.status(500).json({
            success:false,
            message:"server error"+ error.message
           })

        }
    },


    getAllSpecilistByspecilization: async(req,res)=>{
        try {
            const specialization_id=req.params.id
                        console.log("speczion",specialization_id)
                        const users = await Speciliezeduser
            .find({ specialization: specialization_id })
            .populate("specialization", "specialization_name"); 
                        return res.status(201).json({
                success:"true",
                message:"All user by their specilization",
                data:users
             })

        } catch (error) {
            console.error("db error"+error.message)
            return res.status(500).json({
                success:false,
                message:"server error"+error.message

            })
            
        }
    }

            
}
module.exports = { specializationController }

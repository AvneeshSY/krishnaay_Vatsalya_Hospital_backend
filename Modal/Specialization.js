const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
    specialization_name: {
        type: String,
        required: true,
        minlength: [3, 'specicalization must be at least 3 characters long'],
        trim: true,
        unique: true
    },

},
    {
        timestamps: true,
    },
    
)

module.exports =mongoose.model("Specialization", specializationSchema);
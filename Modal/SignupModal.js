const mongoose = require("mongoose")
const Specialization = require("./Specialization.js")


const signupSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: "true",
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  last_name: {
    type: String,
    required: "true",
    minlength: [3, 'Name must be at least 3 characters long'],

  }, email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate emails

    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  profile_image: {
    type: String, // This will store the image URL or file path
    default: null
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization',
    default: null
  },
  profile_img: {
    type: String,
    default: null,
    required: false,


  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: Number,
    default: 1,
    enum: [1, 2],
  },
  profile_complete: {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  status: {
    type: Number,
    default: 1, // 1=active, 0=inactive
    enum: [0, 1], // Only allow 0 or 1
  },
})
module.exports = mongoose.model("signup", signupSchema)
const express = require('express');
const router = express.Router();
const {specializationController} =require("../Controller/SpecializationController.js");

router.post("/add-specialization", specializationController.addSpecialization)
router.get("/get-allspecizialization",specializationController.getAllSpecializations)
router.get("/get-userBySpecilization/:id", specializationController.getAllSpecilistByspecilization)
module.exports = router;
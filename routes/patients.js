const express = require("express");
const router = express.Router();
const axios = require('axios');

const Patient = require("../models/Patient.model");
const MedicalHistory = require("../models/MedicalHistory.model");
const SensorData = require("../models/SensorData.model");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
  res.send("This is just the gateway to patients routes");
});
// Register
router.post("/create", (req, res, next) => {

  let patient = new Patient({
    user: req.body.user.id
  });

  let PersonalInformation = req.body;

  Patient.create(patient, PersonalInformation,(err, patient) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        patient: patient,
        message: "Patient data saved on the chain successfully"
      });
    }
  });
});

router.get("/index", (req, res) => {
  Patient.find({}, function (err, patients) {
    return res.send(JSON.parse(JSON.stringify(patients)));
  })
});

router.get("/:id", (request, response)=>{
  Patient.findById(request.params.id, (err, patient)=>{
    return response.status(200).json({
      success: true,
      patient: patient
    })
  });
})

module.exports = router;

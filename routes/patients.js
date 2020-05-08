const express = require("express");
const router = express.Router();
const axios= require('axios');

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
      country: patient
    })
  });
})

router.post("/medical_history/create", (req, res, next) => {
  Patient.findById(req.body.patient, function (err, patient) {
    if (err) {
      res.send(err);
    } else {
      let MedicalInformation = req.body;
      let medical_history = new MedicalHistory({
        patient: patient,
        history: {
          institution: MedicalInformation.institution ? MedicalInformation.institution: null
        }
      });
      MedicalHistory.create(medical_history, MedicalInformation, (err, medical_history) => {
        if (err) {
          res.json({
            success: false,
            error: err
          })
        } else {
          res.json({
            success: true,
            history: medical_history,
            message: "Patient medical history appended to the blockchain"
          })
        }
      });
    }
  });
});

router.get("/medical_history/:patient", (req, res, next) => {
  MedicalHistory.find({ patient: req.params.patient }, function (err, medical_history) {
    return res.send(JSON.parse(JSON.stringify(medical_history)));
  })
});



router.post("/sensor_data/create", (req, res, next) => {
  Patient.findById(req.body.patient, function (err, patient) {
    if (err) {
      res.send(err);
    } else {
      let sensor_data = new SensorData({
        patient: patient,
        temp: req.body.data.temp,
        pulse: req.body.data.pulse,
        seizure: req.body.data.seizure
      });
      // console.log(sensor_data)
      SensorData.create(sensor_data, (err, sensor_data) => {
        if (err) {
          res.json({
            success: false,
            error: err
          })
        } else {
          res.json({
            success: true,
            data: sensor_data
          })
        }
      });
    }
  });
});

router.get("/sensor_data/:patient", (req, res, next) => {
  SensorData.find({ patient: req.params.patient }, function (err, sensor_data) {
    return res.send(JSON.parse(JSON.stringify(sensor_data)));
  })
});


module.exports = router;

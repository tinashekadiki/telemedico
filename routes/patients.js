const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient.model");
const Contact = require("../models/Contact.model");
const MedicalHistory = require("../models/MedicalHistory.model");
const SensorData = require("../models/SensorData.model");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is just the gateway to patients routes");
});

// Register
router.post("/create", (req, res, next) => {
  let contact = new Contact({
    phone_number: req.body.contact.phone_number,
    address: {
      city: req.body.contact.city,
      street: req.body.contact.street,
      country: req.body.contact.country
    }
  });

  Contact.create(contact, (err, contact) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      let patient = new Patient({
        name: req.body.name,
        email: req.body.email,
        username: req.body.name,
        contact: contact
      });

      Patient.create(patient, (err, patient) => {
        if (err) {
          res.json({
            success: false,
            message: err
          });
        } else {
          res.json({
            success: true,
            patient: patient,
            message: "User Registered successfully"
          });
        }
      });
    }
  });
});

router.get("/index", (req, res) => {
  Patient.find({}, function (err, patients) {
    return res.send(JSON.parse(JSON.stringify(patients)));
  })
});

router.post("/medical_history/create", (req, res, next) => {
  Patient.findById(req.body.patient, function (err, patient) {
    if (err) {
      res.send(err);
    } else {
      let medical_history = new MedicalHistory({
        patient: patient,
        history: {
          condition: req.body.history.condition,
          description: req.body.history.description,
          institution: req.body.history.institution
        }
      });
      MedicalHistory.create(medical_history, (err, medical_history) => {
        if (err) {
          res.json({
            success: false,
            error: err
          })
        } else {
          res.json({
            success: true,
            history: medical_history,
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

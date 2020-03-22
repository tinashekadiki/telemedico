const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient.model");
const Contact = require("../models/Contact.model");
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
      state: req.body.contact.state,
      street: req.body.contact.street,
      country: req.body.contact.country
    }
  });

  //dart var/dynamic

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
    return res.send( JSON.parse(JSON.stringify(patients)));
  })
});

module.exports = router;

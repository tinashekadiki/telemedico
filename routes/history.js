const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient.model");
const MedicalHistory = require("../models/MedicalHistory.model");

router.get("/", (request, response)=>{
    response.send("Zvafaya asi hapana chawati waita, you are just testing the gateway route");
})

router.post("/create", (req, res, next) => {
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

router.get("/:patient", (req, res, next) => {
    MedicalHistory.find({ patient: req.params.patient }, function (err, medical_history) {
        return res.send(JSON.parse(JSON.stringify(medical_history)));
    })
});


module.exports = router;
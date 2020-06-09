const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient.model");
const SensorData = require("../models/SensorData.model");

router.post("/create", (req, res, next) => {
    Patient.findById(req.body.patient, function (err, patient) {
        if (err) {
            res.send(err);
        } else {
            let SensorInformation = req.body;
            let sensor_data = new SensorData({
                patient: patient,
            });
            SensorData.create(sensor_data, SensorInformation, (err, sensor_data) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        error: err
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        data: sensor_data,
                        message: "Patient data appended to the blockchain"
                    })
                }
            });
        }
    });
});

router.get("/:patient", (req, res, next) => {
    SensorData.find({ patient: req.params.patient }, function (err, sensor_data) {
        return res.send(JSON.parse(JSON.stringify(sensor_data)));
    })
});


router.get("/data/:data_id", (req, res, next) => {
    SensorData.findById(req.params.data_id, (err, sensor_data)=>{
        if(err){
            return res.json({error: err})
        }
        SensorData.data(sensor_data, (data, error)=>{
            res.status(200).json({
                success: true,
                data: data,
                error: error
            })
        })
    })
});

module.exports = router;
const mongoose = require("mongoose");
const config = require('../config/database')
const axios = require("axios");

const MedicalHistorySchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Patient"
  },
  xooa_asset_id: {
    type: String,
    default: null
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    default: null
  },
  timestamps: {}
});


const MedicalHistory = (module.exports = mongoose.model(
  "MedicalHistory",
  MedicalHistorySchema
));

module.exports.create = function (MedicalHistory, MedicalInformation, callback) {
  axios.post(process.env.XOOA_URL+"assets?asset-type=medical_history",
  {
    "properties":{
      "name": MedicalInformation.condition.name,
      "description": MedicalInformation.condition.description,
    },
    "details": {
      "symptoms": MedicalInformation.condition.symptoms
    },
    "location": {
      "latitude": MedicalInformation.location.latitude,
      "longitude": MedicalInformation.location.longitude
    },
    "patient": {
      "id": MedicalInformation.patient
    }
  },
  {
    headers: {
      Authorization: "Bearer "+process.env.XOOA_TOKEN,
    }
  }).then(response => {
    // console.log(response.data);
    MedicalHistory.xooa_asset_id = response.data.id;
    MedicalHistory.save(callback);
  }).catch(error => {
    console.log("This error occurred on BHIS: "+ error)
  })
};

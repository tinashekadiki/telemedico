const mongoose = require("mongoose");
const config = require("../config/database");
const axios = require("axios")

const PatientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  xooa_asset_id: {
    type: String,
    required: true
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    default: null
  },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

PatientSchema.pre("save", function (next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Patient = (module.exports = mongoose.model("Patient", PatientSchema));

module.exports.create = function (Patient, PersonalInformation, callback) {
  axios.post(process.env.XOOA_URL+"assets?asset-type=personal_data",
      {
        "properties":{
            "first_name": PersonalInformation.first_name,
            "last_name": PersonalInformation.last_name,
            "id": Patient.user
        },
        "details":{
          "birth_date": PersonalInformation.birth_date,
          "gender": PersonalInformation.gender,
          "street": PersonalInformation.contact.street ? PersonalInformation.contact.street: null,
          "city": PersonalInformation.contact.city,
          "phone_number": PersonalInformation.contact.phone_number ? PersonalInformation.contact.phone_number: null,
          "email": PersonalInformation.contact.email ? PersonalInformation.contact.email: null,
        },
        "location":{
          "latitude": PersonalInformation.contact.latitude,
          "longitude": PersonalInformation.contact.longitude
        }
      },
      {
        headers: {
          Authorization: "Bearer "+process.env.XOOA_TOKEN
        }
      }).then(response => {
        Patient.xooa_asset_id = response.data.id;
        Patient.save(callback);
      }).catch(error => {
        console.log("BHIS Unexpected Error: "+ error)
      })
};


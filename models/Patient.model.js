const mongoose = require("mongoose");
const config = require("../config/database");
const bycrypt = require("bcryptjs");

const PatientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    default: null
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    default: null
  },
  drug_history: [{ type: mongoose.Schema.Types.ObjectId, ref: "DrugHistory" }],
  medical_history: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MedicalHistory" }
  ],
  sensor_data: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SensorData" }
  ],

  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

PatientSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Patient = (module.exports = mongoose.model("Patient", PatientSchema));

module.exports.create = function(Patient, callback) {
  Patient.save(callback);
};

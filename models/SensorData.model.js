const mongoose = require("mongoose");
const config = require("../config/database");

const SensorDataSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Patient"
  },
  temp: {
    type: Number,
    required: true
  },
  pulse: {
    type: Number,
    required: true
  },
  seizure: {
    type: Boolean,
    required: false
  },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SensorDataSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const SensorData = (module.exports = mongoose.model("SensorData", SensorDataSchema));

module.exports.create = function(SensorData, callback) {
    SensorData.save(callback);
};
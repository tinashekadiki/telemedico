const mongoose = require("mongoose");
const config = require('../config/database')

const MedicalHistorySchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Patient"
  },
  history:
    {
      condition: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution",
      },
      description: { type: String }
    },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

MedicalHistorySchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const MedicalHistory = (module.exports = mongoose.model(
  "MedicalHistory",
  MedicalHistorySchema
));

module.exports.create = function (MedicalHistory, callback) {
  MedicalHistory.save(callback);
};

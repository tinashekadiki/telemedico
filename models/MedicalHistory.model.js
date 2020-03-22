const mongoose = require("mongoose");
const config = require('../config/database')

const MedicalHistorySchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient"
  },
  history: [
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
        default: "Home"
      },
      description: { type: String }
    }
  ],
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

MedicalSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const MedicalHistory = (module.exports = mongoose.model(
  "DrugHistory",
  MedicalHistorySchema
));

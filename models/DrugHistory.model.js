const mongoose = require("mongoose");
const config = require('../config/database')

const DrugHistorySchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient"
  },
  history: [
    {
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution"
      },
      reason: { type: String }
    }
  ],
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

DrugHistorySchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const DrugHistory = (module.exports = mongoose.model(
  "DrugHistory",
  DrugHistorySchema
));

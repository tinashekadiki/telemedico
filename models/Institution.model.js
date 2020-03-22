const mongoose = require("mongoose");
const config = require("../config/database");

const InstitutionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District"
  },
  created: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

InstitutionSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Institution = (module.exports = mongoose.model("Institution", InstitutionSchema));

module.exports.create = function(Institution, callback) {
  Institution.save(callback);
};
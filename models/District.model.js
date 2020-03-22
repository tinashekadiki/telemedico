const mongoose = require("mongoose");
const config = require("../config/database");

const DistrictSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Province'
  },
  institutions: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Institution"
      }
  ],
  created: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

DistrictSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const District = (module.exports = mongoose.model("District", DistrictSchema));

module.exports.create = function(District, callback) {
    District.save(callback);
  };
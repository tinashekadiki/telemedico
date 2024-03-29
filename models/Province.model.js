const mongoose = require("mongoose");
const config = require("../config/database");

const ProvinceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  created: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

ProvinceSchema.pre("save", function(next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Province = (module.exports = mongoose.model("Province", ProvinceSchema));

module.exports.create = function(Province, callback) {
  Province.save(callback);
};

module.exports.findById = (Province, id) => {
  return Province.findById(id);
}
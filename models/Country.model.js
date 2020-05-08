const mongoose = require("mongoose");
const config = require("../config/database");


const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CountrySchema.pre("save", function(next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Country = (module.exports = mongoose.model("Country", CountrySchema));

module.exports.create = function(Country, callback) {
  Country.save(callback);
};


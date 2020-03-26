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
  provinces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province"
    }
  ],
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CountrySchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

CountrySchema.query.byId = function(id) {
 return this.where({ _id: id });
};

const Country = (module.exports = mongoose.model("Country", CountrySchema));

module.exports.create = function(Country, callback) {
  Country.save(callback);
};

module.exports.findById = (Country, id) => {
 return Country.where({ _id: id });
}


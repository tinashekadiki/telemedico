const mongoose = require("mongoose");
const config = require("../config/database");

const ContactSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User"
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    houseNum: String,
    street: String,
    city: String,
    state: String,
    country: String
  },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ContactSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Contact = (module.exports = mongoose.model("Contact", ContactSchema));

module.exports.create = function(Contact, callback) {
  Contact.save(callback);
};
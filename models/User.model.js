const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const config = require("../config/database");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUserByID = function(id, callback) {
  return User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  return User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bycrypt.genSalt(10, (err, salt) => {
    bycrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
    });
  });
  newUser.save(callback);
};

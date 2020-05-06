const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
// const config = require("../config/database");
const axios = require("axios");
require('dotenv').config()

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: null
  },
  public_key: {
    type: String,
    default: null
  },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserByID = function(id, callback) {
  return User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  let query = { username: username };
  return User.findOne(query, callback);
};

module.exports.register = function(User, callback) {

  axios.post('identities/enroll',
      {
        "IdentityName": User.name,
        "Access": "rw",
        "Attrs": [
          {
            "name": "email",
            "ecert": true,
            "value": User.email
          },
          {
            "name": "username",
            "ecert": true,
            "value": User.username
          }
        ],
        "canManageIdentities": false
      },
      {
        headers: {
          Authorization: "Bearer "+ process.env.XOOA_TOKEN
        }
      })
      .then(response => {
        console.log(response)
        User.token = response.ApiToken
        User.public_key = response.PublicKey
      }).catch(error => {
        console.log(error)
      })
  bycrypt.genSalt(10, function(err, salt) {
    if(err){
      console.log(err)
    }
    bycrypt.hash(User.password, salt, function(err, hash) {
      User.password = hash;
      User.save(callback);
    });
  });
};

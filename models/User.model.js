const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  xooa_id: {
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

module.exports.register = function(NewUser, callback) {
  axios.post(process.env.XOOA_URL+'identities/',
      {
        "IdentityName": NewUser.name,
        "Access": "rw",
        "Attrs": [
          {
            "name": "email",
            "ecert": true,
            "value": NewUser.email
          },
          {
            "name": "username",
            "ecert": true,
            "value": NewUser.username
          }
        ],
        "canManageIdentities": false
      },
      {
        headers: {
          Authorization: "Bearer "+ process.env.XOOA_TOKEN,
          Accept: "application/json"
        }
      })
      .then(response => {
        // console.log(response.data)
        bcrypt.genSalt(10, function(err, salt) {
          if(err){
            console.log(err)
          }
          bcrypt.hash(NewUser.password, salt, function(err, hash) {
            NewUser.token = response.data.ApiToken
            NewUser.public_key = response.data.PublicKey
            NewUser.xooa_id = response.data.Id
            NewUser.password = hash;
            NewUser.save(callback);
          });
        });
      }).catch(error => {
        console.log("Error "+error)
      })
};

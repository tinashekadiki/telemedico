const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Register
router.post("/register", (request, response) => {
  let NewUser = new User({
    name: request.body.name,
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  });

  User.exists({username: request.body.username}, function (error, ExistingUser) {
    if(ExistingUser){
      return response.status(409).json({
        success: false,
        message: "Username already taken"
        })
    }else {
      User.exists({email: request.body.email}, function (error, ExistingUser) {
        if(ExistingUser){
          return response.status(409).json({
            success: false,
            message: "Email already taken"
          })
        }
        else {
          User.register(NewUser, (err, user) => {
            if (err) {
              response.json({
                success: false,
                message: err.message
              });
            } else {
              response.json({
                success: true,
                message: "User Registered successfully",
                user: user
              });
            }
          });
        }
      });
    }
  });
});

// Authenticate
router.post("/authenticate", (req, res) => {
  res.send("AUTHENTICATE");
});

// Profile
router.get("/profile", (req, res) => {
  res.send("PROFILE");
});

// Validate
router.get("/validate", (req, res) => {
  res.send("VALIDATE");
});

module.exports = router;

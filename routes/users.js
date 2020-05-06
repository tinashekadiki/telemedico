const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.register(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        message: "User Registered successfully",
        user: user
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

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");


router.get("/", (request, response)=>{
  response.send("This is just the gateway to users");
})
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
              let secretOrPrivateKey = process.env.SECRET;
              let token = jwt.sign({ id: user._id }, secretOrPrivateKey, {
                expiresIn: 86400 * 7 // expires in 7 days
              });
              response.json({
                success: true,
                message: "User Registered successfully",
                user: user,
                bhis_token: token
              });
            }
          });
        }
      });
    }
  });
});

// Authenticate
router.post("/authenticate", (request, response) => {
  User.findOne({username: request.body.username}, (error, user)=>{
    if (!error && user != null){
      bcrypt.compare(request.body.password, user.password, (error, success)=> {
        if (error) {
          response.json({
            success: false,
            message: error.message
          });
        } else {
          if (success) {
            let secretOrPrivateKey = process.env.SECRET;
            let token = jwt.sign({ id: user._id }, secretOrPrivateKey, {
              expiresIn: 86400 * 7 // expires in 7 days
            });
            response.json({
              success: success,
              message: "Login successful",
              user: user,
              bhis_token: token
            });
          }
          else {
            response.status(401).json({
              success: false,
              message: "Incorrect username/password"
            });
          }
        }
      })
    }else {
      response.status(401).json({
        success: false,
        message: "Incorrect username/password"
      });
    }
  })

});

// Profile
router.get("/profile", (request, response) => {
  let token = request.headers['x-access-token'];
  let secretOrPublicKey = process.env.SECRET;
  jwt.verify(token, secretOrPublicKey, function(err, decoded) {
    if (err) {
      return response.status(401).json({
        auth: false,
        message: 'Permission denied'
      });
    }
    else {
      User.findById(decoded.id, (err, user)=>{
        return response.status(200).json({
          success: true,
          user: user
        })
      });
    }
  });
});

module.exports = router;

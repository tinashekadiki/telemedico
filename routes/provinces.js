const express = require("express");
const router = express.Router();
const Province = require("../models/Province.model");
const Country = require("../models/Country.model");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is just the gateway provinces");
});

router.post("/create", (req, res) => {
  let province = new Province({
    name: req.body.name,
    country: req.body.country
  });
  // console.log(province);
  Province.create(province, (err, province) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      Country.findById(req.body.country,  (err, country) =>{
        country.save();
        res.json({
          success: true,
          province: province,
          message: "Province added"
        });
      });
    }
  });
});

router.get("/index", (req, res) => {
  Province.find({}, function (err, province) {
    return res.send(JSON.parse(JSON.stringify(province)));
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const District = require("../models/District.model");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is just the gateway districts");
});

router.post("/create", (req, res) => {
  let district = new District({
    name: req.body.name,
    province: req.body.province
  });
  District.create(district, (err, district) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        district: district,
        message: "District added"
      });
    }
  });
});

router.get("/index", (req, res) => {
  District.find({}, function(err, district) {
    return res.send(JSON.parse(JSON.stringify(district)));
  });
});

router.get("/:id", (request, response)=>{
  District.findById(request.params.id, (err, district)=>{
    if(err){
      return response.json({error: err})
    }
    return response.status(200).json({
      success: true,
      country: district
    });
  });
});

module.exports = router;

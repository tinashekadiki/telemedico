const express = require("express");
const router = express.Router();
const Institution = require("../models/Institution.model");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is just the gateway facilities");
});

router.post("/create", (req, res) => {
  let institution = new Institution({
    name: req.body.name,
    district: req.body.district
  });
  Institution.create(institution, (err, institution) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        institution: institution,
        message: "Institution added"
      });
    }
  });
});

router.get("/index", (req, res) => {
  Institution.find({}, function(err, institutions) {
    return res.send(JSON.parse(JSON.stringify(institutions)));
  });
});

router.get("/:id", (request, response)=>{
  Institution.findById(request.params.id, (err, institution)=>{
    if(err){
      return response.json({error: err})
    }
    return response.status(200).json({
      success: true,
      country: institution
    })
  });
})

module.exports = router;

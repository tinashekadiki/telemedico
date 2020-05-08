const express = require("express");
const router = express.Router();
const Country = require("../models/Country.model");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is just the gateway countries");
});

router.post("/create", (req, res) => {
  let country = new Country({
    name: req.body.name,
    continent: req.body.continent
  });
  Country.create(country, (err, country) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.status(201).json({
        success: true,
        country: country,
        message: "Country added"
      });
    }
  });
});

router.get("/index", (req, res) => {
  Country.find({}, function(err, countries) {
    return res.send(JSON.parse(JSON.stringify(countries)));
  });
});

router.get("/:id", (request, response)=>{
  Country.findById(request.params.id, (err, country)=>{
    return response.status(200).json({
      success: true,
      country: country
    })
  });
})

module.exports = router;

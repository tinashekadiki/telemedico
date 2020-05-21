const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database');
require('dotenv').config()

const app = express();

const users = require('./routes/users');
const patients = require('./routes/patients');
const countries = require('./routes/countries');
const provinces = require('./routes/provinces');
const districts = require('./routes/districts');
const history = require('./routes/history');
const sensors = require('./routes/sensors');
const institutions = require('./routes/institutions');
// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware

app.use('/users', users);
app.use('/patients', patients);
app.use('/history', history);
app.use('/countries', countries);
app.use('/provinces', provinces);
app.use('/sensors', sensors);
app.use('/districts', districts);
app.use('/institutions', institutions);
// Index Route
app.get('/', (req, res) => {
  res.send("Well done, this project is in active development, I will definitely share with you the endpoints for the alpha version of the system! Thank you! <br> For any information contact the developer <a href=\"mailto:tinashe.kadiki@uofz.ac.zw\">Kadiki</a>");
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

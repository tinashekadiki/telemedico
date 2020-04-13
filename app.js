const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const connection = require('./config/database');

const app = express();

const users = require('./routes/users');
const patients = require('./routes/patients');
const countries = require('./routes/countries');
const provinces = require('./routes/provinces');
// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware

app.use('/users', users);
app.use('/patients', patients);
app.use('/countries', countries);
app.use('/provinces', provinces);
// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

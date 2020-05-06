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
// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

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

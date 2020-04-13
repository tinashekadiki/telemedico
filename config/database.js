const mongoose = require("mongoose");

const database_url = "mongodb+srv://medic:telemedico@cluster0-rqxay.mongodb.net/test?retryWrites=true&w=majority";

// Connect To Database
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

// On Error
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

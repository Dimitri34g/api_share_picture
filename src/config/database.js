const mongoose = require("mongoose");
require("dotenv").config();

const urlDatabase = process.env.URL_DATABASE;

const connectToDatabase = () => {
  mongoose
    .connect(urlDatabase)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDatabase;

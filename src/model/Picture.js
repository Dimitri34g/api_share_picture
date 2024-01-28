const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  filepath: {
    type: String,
    required: true,
    unique: true,
  },
  webviewPath: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;

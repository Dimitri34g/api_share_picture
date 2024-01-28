const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: true,
    unique: true,
    match: /^(.*\/)?([^/]+)\.(png|jpg|jpeg|gif|bmp|svg|webp)$/i,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;

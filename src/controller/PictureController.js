const Picture = require("../model/Picture");

exports.createPicture = async (req, res) => {
  try {
    const picture = new Picture(req.body);
    await picture.save();
    res.status(201).json(picture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPictures = async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPictureById = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    res.json(picture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePicture = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    Object.assign(picture, req.body);
    await picture.save();
    res.json(picture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePicture = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    await picture.remove();
    res.json({ message: "Picture deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const express = require("express");
const router = express.Router();
const pictureController = require("../controller/PictureController");

// Create a new picture
router.post("/", pictureController.createPicture);

// Retrieve all pictures
router.get("/", pictureController.getPictures);

// Retrieve a single picture with id
router.get("/:id", pictureController.getPictureById);

// Update a picture with id
router.put("/:id", pictureController.updatePicture);

// Delete a picture with id
router.delete("/:id", pictureController.deletePicture);

module.exports = router;

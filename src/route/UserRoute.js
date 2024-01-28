const express = require("express");
const userController = require("../controller/UserController");
const { verifyToken } = require("../middleware/guard-auth");

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/", userController.createUser);

// Update a user by ID
router.put("/:id", verifyToken, userController.updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, userController.deleteUser);

// User login functionality
router.post("/login", userController.login);

module.exports = router;

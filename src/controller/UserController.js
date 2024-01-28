const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Get all users from the database
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get a user by its ID
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Create a new user in the database
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt value of 10

  const newUser = new User({ name, email, password: hashedPassword });

  try {
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err.errors);
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Update a user by its ID
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    if (update.password) {
      const hashedPassword = await bcrypt.hash(update.password, 10); // Hash the new password
      update.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

    return res.status(200).json(updatedUser);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

/**
 * Delete a user by its ID
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "No user with this ID" });
    }

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * User login functionality
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware function
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw Error("Invalid Email or Password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw Error("Invalid Email or Password");
    }

    let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    res.header("auth-token", token).send({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

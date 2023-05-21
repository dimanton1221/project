// req models and helpers
const User = require("../models/user");
const argon2 = require("argon2");
// get all users
const getAllUsers = (req, res) => {
  try {
    User.getAllUsers()
      .then((result) => {
        res.status(200).json({
          message: "User found",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.errors,
        });
      });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// get user by id
const GetUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    User.getUserById(id)
      .then((result) => {
        res.status(200).json({
          message: "User found",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.errors,
        });
      });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// create user
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // use argon2 to hash password
    const hashedPassword = await argon2.hash(password);
    const result = await User.createUser(username, email, hashedPassword, role);
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

module.exports = {
  getAllUsers,
  GetUser,
  createUser,
};

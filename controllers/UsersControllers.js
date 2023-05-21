// req models and helpers
const User = require("../models/UserModels");
const argon2 = require("argon2");

// get all user sequelize models var User is imported from models\UserModels.js
// use findAll() method to get all users
const getAllUsers = async (req, res) => {
  try {
    // count all users
    const count = await User.count();
    const users = await User.findAll();
    res.status(200).json({
      message: "User found",
      count,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// getuser by id
const GetUserbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    // if data null
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }else{
      res.status(200).json({
        message: "User found",
        data: user,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// get user by username
const GetUserbyusername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// Create user
const CreateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // use argon2 to hash password
    const hashedPassword = await argon2.hash(password);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      // error: "User not created",
      error: err.errors,
      // message: err.errors.message,
      // message: err.errors['0'].message,
      // message: err.message,
    });
  }
};

// update user
const UpdateUser = async (req, res) => {
  try {
    // update by username
    // update all
    const { username, email, password, role } = req.body;
    const { id } = req.params;
    // use argon2 to hash password
    const hashedPassword = await argon2.hash(password);
    const result = await User.update(
      {
        username,
        email,
        password: hashedPassword,
        role,
      },
      {
        where: {
          user_id: id,
        },
      }
    );
    res.status(201).json({
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// update password user by username
// first check if user exist and password match
// then update password
const UpdatePassword = async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;
    // check if user exist
    const user = await User.findOne({
      where: {
        username,
      },
    });
    // if user exist
    if (user) {
      // compare password
      const isPasswordMatch = await argon2.verify(user.password, password);
      // if password match
      if (isPasswordMatch) {
        // hash new password
        const hashedPassword = await argon2.hash(newPassword);
        // update password
        const result = await User.update(
          {
            password: hashedPassword,
          },
          {
            where: {
              username,
            },
          }
        );
        res.status(201).json({
          message: "Password updated successfully",
          data: result,
        });
      } else {
        res.status(400).json({
          error: "Password does not match",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// delete Username
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.destroy({
      where: {
        user_id: id,
      },
    });
    // jika data nol maka tidak ada username
    if (!result) {
      res.status(404).json({
        message: "User not found",
        data: result,
      });
    } else {
      res.status(200).json({
        message: "User deleted successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
      message: "User not found",
    });
  }
};

module.exports = {
  getAllUsers,
  GetUserbyid,
  GetUserbyusername,
  CreateUser,
  UpdateUser,
  UpdatePassword,
  DeleteUser,
};

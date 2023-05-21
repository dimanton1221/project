const argon2 = require("argon2");
const User = require("../models/user");

const Login = (req, res) => {
  const { username, password } = req.body;
  User.getUser(username)
    .then(async (user) => {
      if (!user) {
        res.status(401).json({
          message: "User not found dd",
        });
      } else {
        const checkPassword = await argon2.verify(user.password, password);   
        // const checkPassword = (user.password === password) ? true : false;

        if (!checkPassword) {
          res.status(401).json({
            message: "Password not match",
          });
        } else {
          // req.session.userId = user._id;
          req.session.username = user.username;
          req.session.password = user.password;
          res.status(200).json({
            status: "success",
            message: "Login success",
            data: user,
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "User not found",
      });
    });
};

// forgot password
const ForgotPassword = (req, res) => {
  const { username } = req.body;
  User.getUser(username)
    .then(async (user) => {
      // make dummy pesan untuk email (password anda sudah kami kirim)
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Password anda sudah kami kirim",
          // data: user,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "User not found",
      });
    });
};

module.exports = {
  Login,
  ForgotPassword,
};

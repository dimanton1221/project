// req models and helpers
const User = require("../models/user");
const argon2 = require("argon2");


const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // make const for hash password using argon2
  const hashpassword = await argon2.hash(password);
  console.log(hashpassword);
  User.createUser({
    username: username,
    email: email,
    password: hashpassword,
  })
    .then((result) => {
      res.json({
        message: "User created successfully",
        data: result
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};


const UserLogin = (req, res) => {
  const { username, password } = req.body;
  User.getUser(username)
    .then(async (user) => {
      if (!user) {
        res.status(401).json({
          message: "User not found",
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

// get me for verify login
const getMe = async (req, res) => {
  const { username } = req.session;
  // console.log(username);
  try {
    const user = await User.getUser(username);
    res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: "User not found",
    });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    message: "Logout success",
  });
};

module.exports = {
  signup,
  UserLogin,
  getMe,
  logout
};

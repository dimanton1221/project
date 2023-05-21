// check login
// get model user
const User = require("../models/user");

// cek login apakah sudah login atau belum . terus verfikasi password. ceknya pakai sesion
const isLogin = async (req, res, next) => {
  const { username, password } = req.session;
  try {
    const user = await User.getUser(username);
    if (user.password === password) {
      next();
    } else {
      res.status(401).json({
        message: "Please Login",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Please Login",
    });
  }
};

// jika admin role
const isAdmin = async (req, res, next) => {
  const { username } = req.session;
  try {
    const user = await User.getUser(username);
    if (user.role === "admin") {
      next();
    } else {
      res.status(401).json({
        message: "User not admin",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "User not found",
    });
  }
};


module.exports = {
  isAdmin,
  isLogin
}
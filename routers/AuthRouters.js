const express = require("express");
const Router = express.Router();
const AuthController = require("../controllers/AuthControllers");
const VerifyAuth = require("../middleware/AuthVerify");

Router.get("/login", (req, res) => {
  res.render("Auth/mazerlogin", { title: "Login", layout: "layouts/Auth" });
});
// lupa password
Router.get("/forgot-password", (req, res) => {
  res.render("Auth/ForgotPassword", { title: "Forgot Password", layout: "layouts/Auth" });
});

// Api rest
Router.post("/login", AuthController.Login);
Router.post("/forgot-password", AuthController.ForgotPassword);

// logout   
Router.get("/logout", AuthController.Logout);

module.exports = Router;

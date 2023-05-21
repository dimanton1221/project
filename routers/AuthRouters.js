const express = require('express');
const Router = express.Router();
const AuthController = require('../controllers/AuthControllers');
const VerifyAuth = require("../middleware/AuthVerify")

Router.get("/login", (req, res) => {   
    res.render("login", { title: "Login" });
});

Router.get("/signup", (req, res) => {
    res.render("signup", { title: "Signup" });
});

// lupa password
Router.get("/forgot-password", (req, res) => {
    res.render("forgot-password", { title: "Forgot Password" });
});

// Api rest 
Router.post("/login", AuthController.Login);
Router.post("/forgot-password", AuthController.ForgotPassword);



module.exports = Router;
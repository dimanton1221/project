const express = require("express");
const ejslayout = require("express-ejs-layouts");
// const Controller = require('../controllers/DashboardControllers');
const AuthMiddleware = require("../middleware/AuthVerify");
const Router = express.Router();
express().use(ejslayout);
// Router.get("/", AuthMiddleware.isLogin, (req, res) => {
//   res.render("home", { title: "Selamat datang di dashboard" });
// });

Router.get("/", AuthMiddleware.isLogin, (req, res) => {
  res.render("home", {
    title: "Selamat datang di dashboard",
    layout: false,
  });
});

module.exports = Router;

const express = require("express");
const ejslayout = require("express-ejs-layouts");
// const Controller = require('../controllers/DashboardControllers');
const AuthMiddleware = require("../middleware/AuthVerify");
const Router = express.Router();
express().use(ejslayout);
// Router.get("/", AuthMiddleware.isLogin, (req, res) => {
//   res.render("home", { title: "Selamat datang di dashboard" });
// });

Router.get("/", AuthMiddleware.isLogin, async (req, res) => {
  CheckRole = await AuthMiddleware.CheckRole(req, res);
  res.render("home", {
    title: "Selamat Datang Di Dashboard ",
    currentPage: "Dashboard",
    role: CheckRole,
  });
});

Router.get("/UserPage", AuthMiddleware.isLogin, AuthMiddleware.isAdmin, async (req, res) => {
  CheckRole = await AuthMiddleware.CheckRole(req, res);
  res.render("UserPage", {
    title: "User Control",
    currentPage: "UserPage",
    role: CheckRole
  });
});

module.exports = Router;

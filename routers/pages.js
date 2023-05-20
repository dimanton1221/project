const express = require("express");

const Router = express.Router();


Router.get("/", (req, res) => {
    res.render("home");
});

Router.get("/table", (req, res) => {
    res.render("table");
});

Router.get("/login", (req, res) => {
    res.render("login");
});


module.exports = Router;
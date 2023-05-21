const express = require("express");

const Router = express.Router();
const VerifyAuth = require("../middleware/AuthVerify");


Router.get("/",VerifyAuth.isLogin);

module.exports = Router;
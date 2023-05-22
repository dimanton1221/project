const express = require("express");

const Router = express.Router();
const VerifyAuth = require("../middleware/AuthVerify");
// const Controllers = require("../controllers/MeController");

Router.get("/me",VerifyAuth.isLogin,
    (req, res) => {
        res.json({
            message: "Welcome to the API"
        });
    });

// render halaman profil
Router.get("/profil",VerifyAuth.isLogin);

Router.post("/change-password",VerifyAuth.isLogin);


module.exports = Router;
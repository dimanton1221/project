
const express = require('express');
const LoginControllers = require('../controllers/UserControllers');
const Router = express.Router();

// get all users
Router.get("/", LoginControllers.getAllUsers);
// get user by id
Router.get("/:id", LoginControllers.GetUser);

// create user
Router.post("/", LoginControllers.createUser);

// Router.patch("/:id", LoginControllers.updateUser);

module.exports = Router;

const express = require('express');
const LoginControllers = require('../controllers/UsersControllers');
const Router = express.Router();

// get all users
Router.get("/", LoginControllers.getAllUsers);
// get user by id
Router.get("/:id", LoginControllers.GetUserbyid);

// create user
Router.post("/", LoginControllers.CreateUser);

Router.put("/:id", LoginControllers.UpdateUser);

Router.delete("/:id", LoginControllers.DeleteUser);

Router.patch("/change-password", LoginControllers.UpdatePassword);

module.exports = Router;
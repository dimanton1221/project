const express = require('express');
const Controller = require('../controllers/JadwalController');
const Router = express.Router();


// get all users
Router.get("/", Controller.getAllJadwal);
// get user by id
Router.get("/:id", Controller.GetJadwalbyid);

// create user
Router.post("/", Controller.createJadwal);

Router.put("/:id", Controller.updateJadwal);

Router.delete("/:id", Controller.deleteJadwal);

module.exports = Router;
const express = require('express');
const Controller = require('../controllers/ClientControllers');


const Router = express.Router();

// get all clients
Router.get("/", Controller.getAllClient);

// get client by id
Router.get("/:id", Controller.GetClientbyid);

// create client
Router.post("/", Controller.createClient);

Router.put("/:id", Controller.updateClient);

Router.delete("/:id", Controller.deleteClient);


module.exports = Router;
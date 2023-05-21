const express = require('express');
const Controller = require('../controllers/InvoiceControllers');
const Router = express.Router();

// get all invoice
Router.get("/", Controller.getAllInvoice);
Router.get("/:id", Controller.getInvoicebyid);
Router.post("/", Controller.createInvoice);
// Router.put("/:id", Controller.updateInvoice);
// Router.delete("/:id", Controller.deleteInvoice);


module.exports = Router;
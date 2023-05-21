const express = require('express');
const Controller = require('../controllers/InvoiceControllers');
const Router = express.Router();
const AuthVerify = require('../middleware/AuthVerify');

Router.get('/', AuthVerify.isLogin, Controller.getAllInvoice);

module.exports = Router;
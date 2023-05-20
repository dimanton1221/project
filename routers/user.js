
const express = require('express');
const LoginControllers = require('../controllers/users');
const Router = express.Router();


// Datar
// Router.post('/daftar', LoginControllers.signup);
// // Masuk
// Router.post('/masuk', LoginControllers.UserLogin);

// // Get me 
Router.get('/saya', LoginControllers.getMe);

// // logout 
// Router.get('/logout', LoginControllers.logout);

// GET /login - Halaman login untuk pengguna
// Router.get('/login', LoginControllers.getLoginPage);
// POST /login - Menangani proses login pengguna
Router.post('/masuk', LoginControllers.UserLogin);
// GET /register - Halaman pendaftaran pengguna baru
// Router.get('/register', LoginControllers.getLoginPage);
// POST /register - Menangani proses pendaftaran pengguna baru
Router.post('/daftar', LoginControllers.signup);
// GET /dashboard - Halaman dashboard untuk pengguna
// Router.get('/dashboard', LoginControllers.getDashboardPage);
// GET /logout - Menangani proses logout pengguna
Router.get('/logout', LoginControllers.logout);



module.exports = Router;
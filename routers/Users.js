const express = require('express');

Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});

Router.get('/login', (req, res) => {
    res.render('login', { title: "Login" });
});


const express = require('express');
const { checkValid } = require('../../middlewares/auth.middleware');

const app = express.Router();

app.use(express.static('public'));

app.get('/register', checkValid, (req, res) => {
  res.render('register');
});

app.get('/login', checkValid, (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  res.render('logout');
});

module.exports = app;

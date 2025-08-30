const express = require('express');

const app = express.Router();

app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.redirect('/admin/dashboard');
});

app.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', req.user);
});

app.get('/movies', (req, res) => {
  res.render('admin/movies', req.user);
});

app.get('/theatres', (req, res) => {
  res.render('admin/theatres', req.user);
});

app.get('/screens', (req, res) => {
  res.render('admin/screens', req.user);
});

module.exports = app;

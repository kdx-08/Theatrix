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
  const page = req.query.page || 1;
  res.render('admin/movies', { page });
});

app.get('/theatres', (req, res) => {
  res.render('admin/theatres', req.user);
});

app.get('/screens', (req, res) => {
  res.render('admin/screens', req.user);
});

app.get('/add-movie', (req, res) => {
  res.render('admin/add-movie');
});

app.get('/add-theatre', (req, res) => {
  res.render('admin/add-theatre');
});

app.get('/add-screen', (req, res) => {
  res.render('admin/add-screen');
});

app.get('/shows', (req, res) => {
  res.render('admin/shows');
});

app.get('/add-show', (req, res) => {
  res.render('admin/add-show');
});

app.get('/bookings', (req, res) => {
  res.render('admin/bookings');
});

module.exports = app;

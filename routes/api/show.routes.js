const express = require('express');
const app = express.Router();
const {
  getShows,
  addShow,
  deleteShow,
  getMovieShows,
} = require('../../controllers/show.controller');

app.get('/shows', getShows);
app.post('/shows', addShow);
app.delete('/shows/:sid', deleteShow);
app.get('/showDetails/:mid', getMovieShows);

module.exports = app;

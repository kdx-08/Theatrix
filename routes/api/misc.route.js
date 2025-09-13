const express = require('express');
const {
  getTotalSales,
  getTotalTickets,
  getTotalUsers,
  getTotalTheatres,
  getRecentBookings,
  getAllBookings,
  getMovies,
  addMovie,
  getTheatres,
  addTheatre,
  getScreens,
  addScreen,
  getShows,
  getMoviebyId,
} = require('../../controllers/misc.controller');

const app = express.Router();

app.get('/sales', getTotalSales);
app.get('/tickets', getTotalTickets);
app.get('/users', getTotalUsers);
app.get('/theatres', getTotalTheatres);
app.get('/recent', getRecentBookings);
app.get('/movies', getMovies);
app.post('/add-movie', addMovie);
app.get('/theatre-list', getTheatres);
app.post('/add-theatre', addTheatre);
app.get('/screen-list', getScreens);
app.post('/add-screen', addScreen);
app.get('/show-list', getShows);
app.get('/showDetails', getShows);
app.get('/bookings', getAllBookings);
app.get('/movieName/:mid', getMoviebyId);

module.exports = app;

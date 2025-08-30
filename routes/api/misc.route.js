const express = require('express');
const {
  getTotalSales,
  getTotalTickets,
  getTotalUsers,
  getTotalTheatres,
} = require('../../controllers/misc.controller');

const app = express.Router();

app.get('/sales', getTotalSales);
app.get('/tickets', getTotalTickets);
app.get('/users', getTotalUsers);
app.get('/theatres', getTotalTheatres);

module.exports = app;

const express = require('express');
const { bookShow } = require('../../controllers/booking.controller');
const app = express.Router();

app.use(express.json());
app.post('/payment', bookShow);

module.exports = app;

const express = require('express');
const { bookShow, addfeedback } = require('../../controllers/booking.controller');
const app = express.Router();

app.use(express.json());
app.post('/payment', bookShow);
app.post('/addfeedback', addfeedback);

module.exports = app;

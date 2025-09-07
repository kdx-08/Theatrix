const { partialCheck } = require('../../middlewares/auth.middleware');
const express = require('express');

const app = express.Router();
app.use(express.static('public'));

app.get('/', partialCheck, (req, res) => {
  res.render('user/home', {
    user: req.user,
  });
});
app.get('/showDetails', (req, res) => {
  res.render('user/booking');
});

module.exports = app;

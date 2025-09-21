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

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  res.redirect(`https://www.themoviedb.org/movie/${id}`);
});

app.get('/payment', async (req, res) => {
  const { show_id } = req.query;
  res.render('user/payment', { show_id });
});

app.get('/addfeedback', (req, res) => {
  res.render('user/feedback');
});

module.exports = app;

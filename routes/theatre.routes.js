const express = require('express');
const screenRoutes = require('../routes/screen.routes');
const {
  createTheatre,
  getTheatres,
  getTheatre,
  updateTheatre,
  deleteTheatre,
} = require('../controllers/theatre.controller');

const router = express.Router();
router.use('/theatres/:tid', screenRoutes);

router.post('/theatres', createTheatre);
router.get('/theatres', getTheatres);
router.get('/theatres/:id', getTheatre);
router.patch('/theatres/:id', updateTheatre);
router.delete('/theatres/:id', deleteTheatre);

module.exports = router;

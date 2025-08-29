const express = require('express');
const {
  createScreen,
  getScreens,
  getScreen,
  updateScreen,
  deleteScreen,
} = require('../controllers/screen.controller');

const router = express.Router({ mergeParams: true });

router.post('/screens', createScreen);
router.get('/screens', getScreens);
router.get('/screens/:sid', getScreen);
router.patch('/screens/:sid', updateScreen);
router.delete('/screens/:sid', deleteScreen);

module.exports = router;

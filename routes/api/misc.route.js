const express = require('express');
const { getRandom } = require('../../controllers/misc.controller');

const app = express.Router();

app.get('/random', getRandom);

module.exports = app;

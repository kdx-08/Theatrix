const express = require('express');
const { registerRoute, loginRoute, logoutRoute } = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', registerRoute);
router.post('/login', loginRoute);
router.get('/logout', logoutRoute);

module.exports = router;

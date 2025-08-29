const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'access denied' });
  try {
    const decoded = jwt.decode(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'invalid token' });
  }
};

const checkValid = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) next();
  else return res.redirect('/');
};

const partialCheck = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) next();
  else {
    req.user = jwt.decode(token);
    next();
  }
};

module.exports = { checkAuth, checkValid, partialCheck };

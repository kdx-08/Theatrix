const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'access denied' });
  try {
    const decoded = jwt.decode(token);
    req.user = decoded;
    if (req.user.email !== process.env.ADMIN)
      return res.status(403).json({ message: 'access denied' });
    next();
  } catch (error) {
    res.status(400).json('invalid token');
  }
};

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

module.exports = { checkAdmin, checkAuth, checkValid, partialCheck };

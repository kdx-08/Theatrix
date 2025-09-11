const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.decode(token);
    req.user = decoded;
    if (req.user.email !== process.env.ADMIN) return res.sendStatus(403);
    next();
  } catch (error) {
    res.sendStatus(400);
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
    res.sendStatus(400);
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

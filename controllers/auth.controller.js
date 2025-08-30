const db = require('../utils/connectDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const v7 = require('uuid').v7;

const generateToken = (user_id, email, name) => {
  const token = jwt.sign({ user_id, email, name }, process.env.JWT_KEY, {
    expiresIn: '1h',
  });
  return token;
};

const registerRoute = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password)
    return res.status(400).json({ message: 'invalid credentials' });
  try {
    const existQuery = `SELECT user_id FROM users WHERE email=$1 OR phone=$2`;
    const user = await db.query(existQuery, [email, phone]);
    if (user.rows[0]?.user_id)
      return res.status(400).json({ message: 'email/phone already exists' });
    else {
      const user_id = v7();
      const hashedPassword = await bcrypt.hash(password, 12);
      const query = `INSERT INTO users VALUES ($1,$2,$3,$4,$5,$6)`;
      await db.query(query, [user_id, name, email, hashedPassword, phone, new Date()]);
      const token = generateToken(user.user_id, user.email, user.name);
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: 'strict',
        })
        .status(201)
        .json({ message: 'account created successfully' });
    }
  } catch (error) {
    console.log('error in register route', error);
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'invalid credentials' });
  }
  try {
    const user = (await db.query('SELECT * FROM users WHERE email=$1', [email])).rows[0];
    const authStatus = user ? await bcrypt.compare(password, user.password) : false;
    if (!authStatus) return res.status(400).json({ message: 'invalid credentials' });
    const token = generateToken(user.user_id, user.email, user.name);
    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'logged in successfully' });
  } catch (error) {
    console.log('error in login route', error);
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const logoutRoute = (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) return res.status(400).json({ message: 'no account found' });
  res.status(200).clearCookie('token').json({ message: 'logged out successfully' });
};

module.exports = { registerRoute, loginRoute, logoutRoute };

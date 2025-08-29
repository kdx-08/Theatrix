const _ = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkValid, partialCheck } = require('./middlewares/auth.middleware');
const path = require('path');
const authRoute = require('./routes/auth.routes');
const theatreRoutes = require('./routes/theatre.routes');
const miscRoutes = require('./routes/misc.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/auth', authRoute);
app.use('/api/', theatreRoutes);
app.use('/api/anime', miscRoutes);

app.get('/', partialCheck, (req, res) => {
  const user = { user_id: '', name: '', email: '' };
  if (req.user) {
    return res.render('index', req.user);
  } else {
    return res.render('index', user);
  }
});

app.get('/login', checkValid, (req, res) => {
  res.render('login');
});

app.get('/register', checkValid, (req, res) => {
  res.render('register');
});

app.listen(PORT, () => {
  console.log('server is running at port', PORT);
});

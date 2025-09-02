const _ = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { partialCheck, checkAdmin } = require('./middlewares/auth.middleware');
const path = require('path');

const authRoute = require('./routes/api/auth.routes');
const theatreRoutes = require('./routes/api/theatre.routes');
const miscRoutes = require('./routes/api/misc.route');

const authViews = require('./routes/view/authViews.route');
const adminViews = require('./routes/view/adminViews.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

// API routes
app.use('/api/auth', authRoute);
app.use('/api/', theatreRoutes);
app.use('/api/stats', miscRoutes);

// View routes
app.use('/auth', authViews);
app.use('/admin', checkAdmin, adminViews);

app.get('/', partialCheck, (req, res) => {
  const user = { user_id: '', name: '', email: '' };
  if (req.user) {
    return res.render('index', req.user);
  } else {
    return res.render('index', user);
  }
});

app.listen(PORT, () => {
  console.log('server is running at port', PORT);
});

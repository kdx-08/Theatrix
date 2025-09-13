const _ = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { partialCheck, checkAdmin } = require('./middlewares/auth.middleware');
const path = require('path');

const authRoute = require('./routes/api/auth.routes');
const theatreRoutes = require('./routes/api/theatre.routes');
const showRoutes = require('./routes/api/show.routes');
const miscRoutes = require('./routes/api/misc.route');

const authViews = require('./routes/view/authViews.route');
const adminViews = require('./routes/view/adminViews.route');
const userViews = require('./routes/view/userViews.route');

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
app.use('/api/', showRoutes);
app.use('/api/stats', miscRoutes);

// View routes
app.use('/auth', authViews);
app.use('/admin', checkAdmin, adminViews);
app.use('/', userViews);

app.listen(PORT, () => {
  console.log('server is running at port', PORT);
});

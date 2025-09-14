const { v7 } = require('uuid');
const db = require('../utils/connectDB');
const refreshMovies = require('../utils/refreshMovies');

const getTotalSales = async (req, res) => {
  const query = 'SELECT SUM(total_price) FROM booking';
  const response = (await db.query(query)).rows[0];
  res.send(response);
};

const getTotalTickets = async (req, res) => {
  const query = 'SELECT SUM(seat_count) FROM booking';
  const response = (await db.query(query)).rows[0];
  res.send(response);
};

const getTotalUsers = async (req, res) => {
  const query = 'SELECT COUNT(user_id) FROM users';
  const response = (await db.query(query)).rows[0];
  res.send(response);
};

const getTotalTheatres = async (req, res) => {
  const query = 'SELECT COUNT(theatre_id) FROM theatre';
  const response = (await db.query(query)).rows[0];
  res.send(response);
};

const getRecentBookings = async (req, res) => {
  const query = 'SELECT * FROM booking ORDER BY booking_date DESC LIMIT 10';
  const response = (await db.query(query)).rows;
  res.send(response);
};

const getAllBookings = async (req, res) => {
  const query = 'SELECT * FROM booking ORDER BY booking_date DESC';
  const response = (await db.query(query)).rows;
  res.send(response);
};

const getMovies = async (req, res) => {
  const page = req.query.page;
  const query = `SELECT * FROM movie ORDER BY RANDOM() LIMIT 12 OFFSET ${(page - 1) * 12}`;
  const response = (await db.query(query)).rows;
  res.send(response);
};

const addMovie = async (req, res) => {
  const { id, title, duration, overview, lang, rating, poster, year } = req.body;
  const query = 'INSERT INTO movie VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  try {
    await db.query(query, [id, title, duration, overview, lang, rating, poster, year]);
    return res.status(200).json({ message: 'movie added successfully' });
  } catch (error) {
    console.log('error in add movie route');
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

const getTheatres = async (req, res) => {
  const query = `SELECT * FROM theatre`;
  try {
    const response = (await db.query(query)).rows;
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const addTheatre = async (req, res) => {
  const query = 'INSERT INTO theatre VALUES ($1, $2, $3, $4)';
  const id = v7();
  try {
    const { name, location, status } = req.body;
    await db.query(query, [id, name, location, status]);
    return res.status(201).json({ message: 'theatre added' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getScreens = async (req, res) => {
  const query =
    'SELECT s.screen_id, t.theatre_id, t.name, s.screen_name, s.capacity, s.screen_type FROM screen s JOIN theatre t ON s.theatre_id=t.theatre_id';
  try {
    const response = (await db.query(query)).rows;
    return res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const addScreen = async (req, res) => {
  const query = 'INSERT INTO screen VALUES ($1, $2, $3, $4, $5)';
  const id = v7();
  try {
    const { theatre_id, screen_name, capacity, screen_type } = req.body;
    const response = await db.query(query, [id, theatre_id, screen_name, capacity, screen_type]);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getShows = async (req, res) => {
  const query =
    'SELECT m.title, m.duration, m.release_year, m.rating, m.genre, sh.movie_id, m.poster, t.name, sc.screen_name, sh.show_id, sh.show_time, sh.price FROM movie m JOIN show sh ON m.movie_id=sh.movie_id JOIN screen sc ON sh.screen_id=sc.screen_id JOIN theatre t ON sc.theatre_id=t.theatre_id';
  try {
    const response = (await db.query(query)).rows;
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getMoviebyId = async (req, res) => {
  const { mid } = req.params;
  const query = `select title, poster, genre from movie where movie_id=$1`;
  try {
    const response = (await db.query(query, [mid])).rows;
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const refresh = async (req, res) => {
  refreshMovies();
};

module.exports = {
  getTotalSales,
  getTotalTickets,
  getTotalUsers,
  getTotalTheatres,
  getRecentBookings,
  getAllBookings,
  getMovies,
  addMovie,
  getTheatres,
  addTheatre,
  getScreens,
  addScreen,
  getShows,
  getMoviebyId,
  refresh,
};

const { v7 } = require('uuid');
const db = require('../utils/connectDB');

const getShows = async (req, res) => {
  const query = 'SELECT * FROM show';
  try {
    const response = (await db.query(query)).rows;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const addShow = async (req, res) => {
  const sid = v7();
  const { movie_id, screen_id, show_time, price, status } = req.body;
  if (!movie_id || !screen_id || !show_time || !price || !status) return res.sendStatus(400);
  try {
    const available_seats = (
      await db.query('SELECT capacity FROM screen WHERE screen_id=$1', [screen_id])
    ).rows[0].capacity;
    const query = 'INSERT INTO show VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await db.query(query, [sid, movie_id, screen_id, show_time, price, status, available_seats]);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const deleteShow = async (req, res) => {
  const { sid } = req.params;
  if (!sid) return res.sendStatus(400);
  try {
    const query = 'DELETE FROM show WHERE show_id=$1';
    await db.query(query, [sid]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getMovieShows = async (req, res) => {
  const { mid } = req.params;
  if (!mid) {
    res.sendStatus(400);
  }
  try {
    const query =
      'select t.name, sc.theatre_id, sh.price, sh.show_time, sh.show_id from show sh join screen sc on sc.screen_id = sh.screen_id join theatre t on t.theatre_id = sc.theatre_id where movie_id=$1';
    const response = (await db.query(query, [mid])).rows;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { getShows, addShow, deleteShow, getMovieShows };

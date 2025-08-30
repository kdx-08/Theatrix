const db = require('../utils/connectDB');

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

module.exports = { getTotalSales, getTotalTickets, getTotalUsers, getTotalTheatres };

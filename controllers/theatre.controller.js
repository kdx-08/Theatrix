const db = require('../utils/connectDB');
const { v7 } = require('uuid');

const createTheatre = async (req, res) => {
  const theatre_id = v7();
  const { name, location, status } = req.body;
  if (!name || !location || !status)
    return res.status(400).json({ message: 'invalid information' });
  try {
    const query = 'INSERT INTO theatre VALUES ($1, $2, $3, $4)';
    await db.query(query, [theatre_id, name, location, status]);
    return res.status(201).json({ theatre_id });
  } catch (error) {
    console.log('error in create theatre route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getTheatres = async (req, res) => {
  const query = 'SELECT * FROM theatre';
  try {
    const theatres = (await db.query(query))?.rows;
    if (!theatres) return res.status(200).json({ message: 'no theatres found' });
    return res.status(200).json(theatres);
  } catch (error) {
    console.log('error in get theatres route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getTheatre = async (req, res) => {
  const theatre_id = req.params.id;
  const query = 'SELECT * FROM theatre WHERE theatre_id=$1';
  try {
    const theatre = (await db.query(query, [theatre_id]))?.rows[0];
    if (theatre === undefined) return res.status(404).json({ message: 'theatre not found' });
    return res.status(200).json(theatre);
  } catch (error) {
    console.log('error in get theatre route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const updateTheatre = async (req, res) => {
  const theatre_id = req.params.id;
  const query = 'SELECT * FROM theatre WHERE theatre_id=$1';
  const theatre = (await db.query(query, [theatre_id])).rows[0];
  if (theatre === undefined) return res.status(404).json({ message: 'theatre not found' });
  const { name, location, status } = req.body;
  if (!theatre_id || !name || !location || !status)
    return res.status(400).json({ message: 'invalid information' });
  try {
    const query = 'UPDATE theatre SET name=$1, location=$2, status=$3 WHERE theatre_id=$4';
    await db.query(query, [name, location, status, theatre_id]);
    return res.status(200).json({ theatre_id });
  } catch (error) {
    console.log('error in update theatre route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const deleteTheatre = async (req, res) => {
  const theatre_id = req.params.id;
  if (!theatre_id) return res.status(400).json({ message: 'invalid information' });
  const query = 'SELECT * FROM theatre WHERE theatre_id=$1';
  const theatre = (await db.query(query, [theatre_id])).rows[0];
  if (theatre === undefined) return res.status(404).json({ message: 'theatre not found' });
  try {
    await db.query(
      'DELETE FROM reservation WHERE screen_id IN (SELECT screen_id FROM screen WHERE theatre_id=$1)',
      [theatre_id]
    );
    await db.query(
      'DELETE FROM booking WHERE show_id IN (SELECT show_id FROM show WHERE screen_id IN (SELECT screen_id FROM screen WHERE theatre_id=$1))',
      [theatre_id]
    );
    await db.query(
      'DELETE FROM show WHERE screen_id IN (SELECT screen_id FROM screen WHERE theatre_id=$1)',
      [theatre_id]
    );
    await db.query('DELETE FROM screen WHERE theatre_id=$1', [theatre_id]);
    await db.query('DELETE FROM theatre WHERE theatre_id=$1', [theatre_id]);
    return res.status(200).json({ message: 'theatre deleted successfully' });
  } catch (error) {
    console.log('error in delete theatre route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

module.exports = {
  createTheatre,
  getTheatres,
  getTheatre,
  updateTheatre,
  deleteTheatre,
};

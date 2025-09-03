const { v7 } = require('uuid');
const db = require('../utils/connectDB');

const checkTheatre = async (id) => {
  const theatre = (await db.query('SELECT * FROM theatre where theatre_id=$1', [id])).rows[0];
  if (theatre === undefined) return false;
  return true;
};

const createScreen = async (req, res) => {
  const sid = v7();
  const { tid } = req.params;
  if (!tid || !(await checkTheatre(tid)))
    return res.status(404).json({ message: 'theatre not found' });
  const { sname, capacity, stype } = req.body;
  if (!sname || !capacity || !stype)
    return res.status(400).json({ message: 'invalid information' });
  try {
    const query = 'INSERT INTO screen VALUES ($1, $2, $3, $4, $5)';
    await db.query(query, [sid, tid, sname, parseInt(capacity), stype]);
    return res.status(201).json({ sid });
  } catch (error) {
    console.log('error in create screen route');
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

const getScreens = async (req, res) => {
  const { tid } = req.params;
  if (!tid || !checkTheatre(tid)) return res.status(404).json({ message: 'theatre not found' });
  try {
    const query = 'SELECT * FROM screen WHERE theatre_id=$1';
    const screens = (await db.query(query, [tid])).rows;
    res.status(200).json(screens);
  } catch (error) {
    console.log('error in get screens route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getScreen = async (req, res) => {
  const { tid, sid } = req.params;
  if (!tid || !(await checkTheatre(tid)))
    return res.status(404).json({ message: 'theatre not found' });
  try {
    const query = 'SELECT * FROM screen WHERE screen_id=$1';
    const screen = (await db.query(query, [sid])).rows[0];
    if (!screen) return res.status(200).json({ message: 'screen not found' });
    res.status(200).json(screen);
  } catch (error) {
    console.log('error in get screen route');
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const updateScreen = async (req, res) => {
  const { tid, sid } = req.params;
  if (!tid || !(await checkTheatre(tid)))
    return res.status(404).json({ message: 'theatre not found' });
  const query = 'SELECT * FROM screen WHERE screen_id=$1';
  const screen = (await db.query(query, [sid])).rows[0];
  if (!screen) return res.status(200).json({ message: 'screen not found' });
  const { sname, capacity, stype } = req.body;
  if (!sname || !capacity || !stype)
    return res.status(400).json({ message: 'invalid information' });
  try {
    const query =
      'UPDATE screen SET screen_name=$1, capacity=$2, screen_type=$3 WHERE screen_id=$4';
    await db.query(query, [sname, parseInt(capacity), stype, sid]);
    return res.status(200).json({ message: 'screen updated successfully' });
  } catch (error) {
    console.log('error in update screen route');
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

const deleteScreen = async (req, res) => {
  const { tid, sid } = req.params;
  if (!tid || !checkTheatre(tid)) return res.status(404).json({ message: 'theatre not found' });
  const query = 'SELECT * FROM screen WHERE screen_id=$1';
  const screen = (await db.query(query, [sid])).rows[0];
  if (!screen) return res.status(200).json({ message: 'screen not found' });
  try {
    const delResr = 'DELETE FROM reservation WHERE screen_id=$1';
    const delBook =
      'DELETE FROM booking WHERE show_id IN (SELECT show_id FROM show WHERE screen_id=$1)';
    const delShow = 'DELETE FROM show WHERE screen_id=$1';
    const query = 'DELETE FROM screen WHERE screen_id=$1';
    await db.query(delResr, [sid]);
    await db.query(delBook, [sid]);
    await db.query(delShow, [sid]);
    await db.query(query, [sid]);
    return res.status(200).json({ message: 'screen deleted successfully' });
  } catch (error) {
    console.log('error in delete screen route');
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

module.exports = {
  createScreen,
  getScreens,
  getScreen,
  updateScreen,
  deleteScreen,
};

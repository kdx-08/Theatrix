const db = require('../utils/connectDB');

const getRandom = async (req, res) => {
  const result = await db.query('SELECT * FROM movie');
  const values = [];
  for (let i = 0; i < 10; i++) {
    randomVal = Math.floor(Math.random() * 250);
    values.push(result[0][randomVal]);
  }
  return res.status(200).json(values);
};

module.exports = { getRandom };

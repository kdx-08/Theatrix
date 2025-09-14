const db = require('../utils/connectDB');
const { v7 } = require('uuid');

const bookShow = async (req, res) => {
  const booking_id = v7();
  const user_id = req.user.user_id;
  const { show_id, amount, booking_date, seat_count } = req.body;
  try {
    const query = 'INSERT INTO booking VALUES ($1, $2, $3, $4, $5, $6)';
    await db.query(query, [booking_id, user_id, show_id, booking_date, seat_count, amount]);
    await db.query('UPDATE show SET available_seats=available_seats-$1 WHERE show_id=$2', [
      seat_count,
      show_id,
    ]);
    res.status(201).json({ message: 'ticket(s) booked sucessfully' });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { bookShow };

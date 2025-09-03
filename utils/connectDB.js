const _ = require('dotenv').config();
const pg = require('pg');

const db = new pg.Client({
  connectionString: process.env.SUPA_URL,
  ssl: { rejectUnauthorized: false },
});

db.connect();
module.exports = db;

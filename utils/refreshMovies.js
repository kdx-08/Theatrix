const _ = require('dotenv').config({ path: '../.env' });
const axios = require('axios');
const db = require('./connectDB');
let results = [];

const refreshMovies = () => {
  let page = 1;
  const interval = setInterval(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API}`,
        },
      }
    );
    page += 1;
    results.push(...response.data.results);
    console.log(results.length);
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    console.log('Fetched latest!');
    addMovies();
  }, 20000);
};

const addMovies = async (req, res) => {
  let updated = 0;
  for (let movie of results) {
    try {
      const movie_id = movie.id;
      const title = movie.title;
      const duration = 100;
      const genre = movie.overview;
      const language = movie.original_language;
      const rating = movie.vote_average;
      const poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      const release_year = movie.release_date.split('-')[0];
      const response = await db.query('INSERT INTO movie VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
        movie_id,
        title,
        duration,
        genre,
        language,
        rating,
        poster,
        release_year,
      ]);
      updated += 1;
      console.log('new movies total ', updated);
    } catch (error) {
      continue;
    }
  }
  return;
};

module.exports = refreshMovies;

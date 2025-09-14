const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1].split('?')[0]}`);
const addMovie = document.querySelector('.add-btn');
const refreshMovies = document.getElementById('refresh');
activeLink.classList.add('active-link');

addMovie.addEventListener('click', () => {
  window.location.replace(`${window.location.origin}/admin/add-movie`);
});

refreshMovies.addEventListener('click', async () => {
  const res = await fetch('/api/stats/refresh', { method: 'GET' });
  console.log(res);
});

const next = () => {
  if (!window.location.href.includes('='))
    window.location.replace(window.location.href + '?page=2');
  else {
    const p = parseInt(window.location.href.split('=')[1]) + 1;
    let location = window.location.href;
    const index = location.indexOf('=');
    location = location.slice(0, index + 1) + p;
    window.location.replace(location);
  }
};

const prev = () => {
  const p = parseInt(window.location.href.split('=')[1]) - 1;
  if (p > 0) {
    let location = window.location.href;
    const index = location.indexOf('=');
    location = location.slice(0, index + 1) + p;
    window.location.replace(location);
  }
};

const reloadMovies = async () => {
  const movieContainer = document.querySelector('.movies');
  const page = document.querySelector('#page').innerHTML;
  const response = await fetch(`/api/stats/movies?page=${page}`, { method: 'GET' });
  const movies = await response.json();

  for (let movie of movies) {
    const movieElement = document.createElement('div');
    const img = document.createElement('img');
    const desc = document.createElement('div');
    const title = document.createElement('p');
    const about = document.createElement('p');

    movieElement.classList.add('movie');
    img.setAttribute('src', `${movie.poster}`);
    desc.classList.add('description');
    title.classList.add('title');
    title.innerHTML = movie.title;
    about.innerHTML = movie.genre;

    desc.appendChild(title);
    desc.appendChild(about);
    movieElement.appendChild(img);
    movieElement.appendChild(desc);
    movieContainer.appendChild(movieElement);
  }
};

const prevBtn = document.querySelector('#prev');
prevBtn.addEventListener('click', prev);
const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', next);

reloadMovies();

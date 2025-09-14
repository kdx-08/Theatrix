function login() {
  window.location.href = '/auth/login';
}

const carousel = async () => {
  const shows = await (await fetch('/api/stats/show-list', { method: 'GET' })).json();
  const set = new Set(shows);
  const show = Array.from(set);
  const item_div = document.querySelector('.carousel-inner');
  show.forEach((element, index) => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    if (index == 0) {
      item.classList.add('active');
    }
    item.innerHTML = `
      <a href='/showDetails?${element.movie_id}'>
        <img
          src=${element.poster}
          class="d-block w-100"
          alt="..."
        />
      </a>
      <div class="carousel-caption d-none d-md-block">
        <h5>${element.title}</h5>
      </div>
    `;
    item_div.appendChild(item);
  });
};

const listMovies = async () => {
  const movies = await (await fetch(`/api/stats/movies?page=3`, { method: 'GET' })).json();
  const listContainer = document.querySelector('.movie-row');
  movies.forEach((element) => {
    const item = document.createElement('a');
    item.classList.add('col-3', 'position-relative');
    const wrapper = document.createElement('div');
    wrapper.classList.add('position-relative');
    const desc = document.createElement('div');
    desc.classList.add('desc');
    const title = document.createElement('h6');
    const rating = document.createElement('p');
    title.innerHTML = `${element.title}`;
    rating.innerHTML = `rating: ${element.rating}`;
    desc.appendChild(title);
    desc.appendChild(rating);
    const img = document.createElement('img');
    img.setAttribute('src', `${element.poster}`);
    img.classList.add('img-fluid');
    wrapper.appendChild(img);
    wrapper.appendChild(desc);
    item.appendChild(wrapper);
    item.href = `https://themoviedb.org/movie/${element.movie_id}`;
    listContainer.appendChild(item);
  });
};

carousel();
listMovies();

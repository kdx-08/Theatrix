function login() {
  window.location.href = '/auth/login';
}

const listMovies = async () => {
  const shows = await (await fetch('/api/stats/show-list', { method: 'GET' })).json();

  const item_div = document.querySelector('.carousel-inner');
  shows.forEach((element, index) => {
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

listMovies();

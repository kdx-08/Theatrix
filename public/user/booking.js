const listAvailable = async () => {
  const movieId = window.location.href.split('?');
  const details = await (await fetch(`/api/showDetails/${movieId[1]}`, { method: 'GET' })).json();
  const movie = await (await fetch(`/api/stats/movieName/${movieId[1]}`, { method: 'GET' })).json();
  const item_div = document.querySelector('.container');
  item_div.innerHTML = `<h1>${movie[0].title}<h1>`;
  details.forEach((element, index) => {
    const item = document.createElement('div');
    const time = element.show_time.split('T');
    item.innerHTML = `
      <div class="theatre row">
        <h2>${element.name}</h3>
        <div class="show col">
          <h3>${time[1].slice(0, 5)}</h3>
          <h5>${element.price}</h5>
        </div>
      </div>
    `;
    item_div.appendChild(item);
  });
};

listAvailable();

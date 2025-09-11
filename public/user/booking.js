const listAvailable = async () => {
  const movieId = window.location.href.split('?')[1];
  const details = await (await fetch(`/api/showDetails/${movieId}`, { method: 'GET' })).json();
  const movie = await (await fetch(`/api/stats/movieName/${movieId}`, { method: 'GET' })).json();
  const item_div = document.querySelector('.container');
  const theatres = new Map();
  for (let detail of details) {
    theatres.set(detail.theatre_id, []);
  }
  for (let detail of details) {
    theatres.get(detail.theatre_id).push(`${detail.show_time} ₹${detail.price}`);
  }
  item_div.innerHTML = `<h1>${movie[0].title}<h1>`;
  theatres.forEach((element, key) => {
    const theatreRow = document.createElement('div');
    const theatreName = document.createElement('h2');
    const showsRow = document.createElement('div');
    showsRow.classList.add('shows');
    showsRow.classList.add('row');
    for (let show of element) {
      const showCol = document.createElement('div');
      showCol.classList.add('show');
      showCol.classList.add('col');
      showCol.innerHTML = `<h3>${new Date(show.split(' ')[0])
        .toLocaleTimeString()
        .slice(0, -3)}</h3><h5>${show.split(' ')[1]}</h5>`;
      showsRow.appendChild(showCol);
    }
    theatreName.innerHTML = details.find((detail) => detail.theatre_id === key).name;
    theatreRow.classList.add('theatre');
    theatreRow.classList.add('row');
    theatreRow.appendChild(theatreName);
    theatreRow.appendChild(showsRow);
    item_div.appendChild(theatreRow);
  });
};

listAvailable();

const listAvailable = async () => {
  const movieId = window.location.href.split('?');
  const details = await (await fetch(`/api/showDetails/${movieId[1]}`, { method: 'GET' })).json();

  details.forEach((element, index) => {
    const item_div = document.querySelector('.container');
    const item = document.createElement('div');
    const time = element.show_time.split('T');
    item.innerHTML = `
    <h1>${element.name}</h1>
    <div>
        <h5>${time[1].slice(0, 5)}</h5>
        <p>${element.price}</p>
    </div>
    `;
    item_div.appendChild(item);
  });
};

listAvailable();

const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const addShow = document.querySelector('.add-show');
addShow.addEventListener('click', () => {
  window.location.replace(`${window.location.origin}/admin/add-show`);
});

const reloadShows = async () => {
  const showItems = document.querySelector('.show-items');
  const shows = await (await fetch('/api/stats/show-list', { method: 'GET' })).json();
  if (!shows.length) {
    const noRecent = document.createElement('p');
    noRecent.innerHTML = 'No shows found.';
    showItems.classList.add('no-recent');
    showItems.appendChild(noRecent);
  } else {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('show-header');
    tableHeader.innerHTML = `
    <p>Movie name</p>
    <p>Theatre name</p>
    <p>Screen name</p>
    <p>Time</p>
    <p>Price</p>
    <p>Options</p>
    `;
    showItems.appendChild(tableHeader);
    for (let i = 0; i < shows.length; i++) {
      const showItem = document.createElement('div');
      showItem.classList.add('show-item');
      const { title, name, screen_name, show_time, price } = shows[i];
      showItem.innerHTML = `
      <p>${title}</p>
      <p>${name}</p>
      <p>${screen_name}</p>
      <p>${new Date(show_time).toDateString()}</p>
      <p>${price}</p>
      <p><button class='remove-btn' id=${shows[i].show_id}>&#128465;</button></p>`;
      showItems.appendChild(showItem);
    }
    for (let i = 0; i < shows.length; i++) {
      const id = shows[i].show_id;
      const removeBtn = document.getElementById(id);
      removeBtn.addEventListener('click', async () => {
        await fetch(`/api/shows/${id}`, { method: 'DELETE' });
        window.location.reload();
      });
    }
  }
};

reloadShows();

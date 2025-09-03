const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const addBtn = document.querySelector('.add-theatre');
addBtn.addEventListener('click', () => {
  window.location.replace(`${window.location.origin}/admin/add-theatre`);
});

const reloadTheatres = async () => {
  const theatreList = document.querySelector('.theatre-list');
  const theatres = await (await fetch('/api/stats/theatre-list', { method: 'GET' })).json();
  if (!theatres.length) {
    const noTheatre = document.createElement('p');
    noTheatre.innerHTML = 'No theatres found.';
    theatreList.classList.add('no-theatre');
    theatreList.appendChild(noTheatre);
  } else {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('theatre-header');
    tableHeader.innerHTML = `
    <p>Theatre ID</p>
    <p>Name</p>
    <p>Location</p>
    <p>Status</p>
    <p>Options</p>
    `;
    theatreList.appendChild(tableHeader);
    for (let i = 0; i < theatres.length; i++) {
      const theatre = document.createElement('div');
      theatre.classList.add('theatre-item');
      const { theatre_id, name, location, status } = theatres[i];
      theatre.innerHTML = `
      <p>${theatre_id}</p>
      <p>${name}</p>
      <p>${location}</p>
      <p>${status}</p>
      <p><button class='remove-btn' id=${theatre_id}>&#128465;</button></p>
      `;
      theatreList.appendChild(theatre);
    }
    for (let i = 0; i < theatres.length; i++) {
      const id = theatres[i].theatre_id;
      const removeBtn = document.getElementById(id);
      removeBtn.addEventListener('click', async () => {
        await (await fetch(`/api/theatres/${id}`, { method: 'DELETE' })).json();
        window.location.reload();
      });
    }
  }
};

reloadTheatres();

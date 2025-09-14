const showForm = document.forms.show;
const actionResponse = document.querySelector('.action-response');

const getTheatreList = async () => {
  const theatreList = document.getElementById('theatre');
  const theatres = await (await fetch('/api/stats/theatre-list', { method: 'GET' })).json();
  for (let i = 0; i < theatres.length; i++) {
    const theatre = document.createElement('option');
    theatre.value = theatres[i].theatre_id;
    theatre.innerHTML = `${theatres[i].name}-${theatres[i].location}`;
    theatreList.appendChild(theatre);
  }
};

const updateScreenList = async () => {
  const screenList = document.getElementById('screens');
  screenList.innerHTML = '';
  const theatre = document.getElementById('theatre').value;
  const screens = await (await fetch(`/api/theatres/${theatre}/screens`, { method: 'GET' })).json();
  for (let i = 0; i < screens.length; i++) {
    const screen = document.createElement('option');
    screen.value = screens[i].screen_id;
    screen.innerHTML = `${screens[i].screen_name}`;
    screenList.appendChild(screen);
  }
};

const theatreChoice = document.getElementById('theatre');
theatreChoice.addEventListener('click', updateScreenList);

showForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const movie_id = showForm.movie_id.value;
  const screen_id = showForm.screens.value;
  const show_time = new Date(showForm.time.value);
  const price = showForm.price.value;

  const res = await fetch('/api/shows/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ movie_id, screen_id, show_time, price, status: 'upcoming' }),
  });
  window.location.replace(window.location.origin + '/admin/shows');
});

getTheatreList();

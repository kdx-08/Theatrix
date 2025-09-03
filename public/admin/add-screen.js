const screenForm = document.forms.screen;
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

screenForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const theatre_id = screenForm.theatre.value;
  const screen_name = screenForm.name.value;
  const capacity = screenForm.capacity.value;
  const screen_type = screenForm.type.value;

  const res = await fetch('/api/stats/add-screen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ theatre_id, screen_name, capacity, screen_type }),
  });
  window.location.replace(window.location.origin + '/admin/screens');
});

getTheatreList();

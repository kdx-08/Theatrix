const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const addScreen = document.querySelector('.add-screen');
addScreen.addEventListener('click', () => {
  window.location.replace(`${window.location.origin}/admin/add-screen`);
});

const reloadScreens = async () => {
  const screenItems = document.querySelector('.screen-items');
  const screens = await (await fetch('/api/stats/screen-list', { method: 'GET' })).json();
  if (!screens.length) {
    const noRecent = document.createElement('p');
    noRecent.innerHTML = 'No screens found.';
    screenItems.classList.add('no-recent');
    screenItems.appendChild(noRecent);
  } else {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('screen-header');
    tableHeader.innerHTML = `
    <p>Screen ID</p>
    <p>Theatre name</p>
    <p>Screen name</p>
    <p>Capacity</p>
    <p>Type</p>
    <p>Options</p>
    `;
    screenItems.appendChild(tableHeader);
    for (let i = 0; i < screens.length; i++) {
      const screenItem = document.createElement('div');
      screenItem.classList.add('screen-item');
      const { screen_id, name, screen_name, capacity, screen_type } = screens[i];
      screenItem.innerHTML = `
      <p>${screen_id}</p>
      <p>${name}</p>
      <p>${screen_name}</p>
      <p>${capacity}</p>
      <p>${screen_type.toUpperCase()}</p>
      <p><button class='remove-btn' id=${screen_id}>&#128465;</button></p>`;
      screenItems.appendChild(screenItem);
    }
    for (let i = 0; i < screens.length; i++) {
      const id = screens[i].screen_id;
      const theatre_id = screens[i].theatre_id;
      const removeBtn = document.getElementById(id);
      removeBtn.addEventListener('click', async () => {
        await (
          await fetch(`/api/theatres/${theatre_id}/screens/${id}`, { method: 'DELETE' })
        ).json();
        window.location.reload();
      });
    }
  }
};

reloadScreens();

const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const reloadBookings = async () => {
  const bookingItems = document.querySelector('.booking-items');
  const bookings = await (await fetch('/api/stats/bookings', { method: 'GET' })).json();
  console.log(bookings);
  if (!bookings.length) {
    const noRecent = document.createElement('p');
    noRecent.innerHTML = 'No bookings found.';
    bookingItems.classList.add('no-recent');
    bookingItems.appendChild(noRecent);
  } else {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('booking-header');
    tableHeader.innerHTML = `
    <p>Movie name</p>
    <p>Theatre name</p>
    <p>Screen name</p>
    <p>Time</p>
    <p>Price</p>
    <p>Options</p>
    `;
    bookingItems.appendChild(tableHeader);
    for (let i = 0; i < bookings.length; i++) {
      const bookingItem = document.createElement('div');
      bookingItem.classList.add('booking-item');
      const { title, name, screen_name, show_time, price } = bookings[i];
      bookingItem.innerHTML = `
      <p>${title}</p>
      <p>${name}</p>
      <p>${screen_name}</p>
      <p>${new Date(show_time).toDateString()}</p>
      <p>${price}</p>
      <p><button class='remove-btn' id=${bookings[i].show_id}>&#128465;</button></p>`;
      bookingItems.appendChild(bookingItem);
    }
  }
};

reloadBookings();

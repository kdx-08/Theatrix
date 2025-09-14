const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const reloadBookings = async () => {
  const bookingItems = document.querySelector('.booking-items');
  const bookings = await (await fetch('/api/stats/bookings', { method: 'GET' })).json();
  if (!bookings.length) {
    const noRecent = document.createElement('p');
    noRecent.innerHTML = 'No bookings found.';
    bookingItems.classList.add('no-recent');
    bookingItems.appendChild(noRecent);
  } else {
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('booking-header');
    tableHeader.innerHTML = `
    <p>Booking ID</p>
    <p>User ID</p>
    <p>Show ID</p>
    <p>Date</p>
    <p>Price</p>
    `;
    bookingItems.appendChild(tableHeader);
    for (let i = 0; i < bookings.length; i++) {
      const bookingItem = document.createElement('div');
      bookingItem.classList.add('booking-item');
      bookingItem.innerHTML = `
      <p>${bookings[i].booking_id}</p>
      <p>${bookings[i].user_id}</p>
      <p>${bookings[i].show_id}</p>
      <p>${new Date(bookings[i].booking_date).toLocaleDateString()}</p>
      <p>₹${bookings[i].total_price}</p>`;
      bookingItems.appendChild(bookingItem);
    }
  }
};

reloadBookings();

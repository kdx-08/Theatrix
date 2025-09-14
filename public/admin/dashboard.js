const value = window.location.href.split('/');
const activeLink = document.querySelector(`#${value[value.length - 1]}`);
activeLink.classList.add('active-link');

const reloadDashboard = async () => {
  const sales_card = document.querySelector('.sales-value');
  const tickets_card = document.querySelector('.tickets-value');
  const users_card = document.querySelector('.users-value');
  const theatres_card = document.querySelector('.theatres-value');

  const sales = await fetch('/api/stats/sales', { method: 'GET' });
  const tickets = await fetch('/api/stats/tickets', { method: 'GET' });
  const users = await fetch('/api/stats/users', { method: 'GET' });
  const theatres = await fetch('/api/stats/theatres', { method: 'GET' });

  sales_card.innerHTML = `₹${(await sales.json()).sum || 0}`;
  tickets_card.innerHTML = `${(await tickets.json()).sum || 0}`;
  users_card.innerHTML = `${(await users.json()).count}`;
  theatres_card.innerHTML = `${(await theatres.json()).count}`;

  const bookingItems = document.querySelector('.booking-items');
  const recentBookings = await (await fetch('/api/stats/recent', { method: 'GET' })).json();
  if (!recentBookings.length) {
    const noRecent = document.createElement('p');
    noRecent.innerHTML = 'No recent transactions found.';
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
    <p>Tickets</p>
    <p>Amount</p>
    `;
    bookingItems.appendChild(tableHeader);
    console.log(recentBookings);
    for (let i = 0; i < recentBookings.length; i++) {
      const bookingItem = document.createElement('div');
      bookingItem.classList.add('booking-item');
      const { booking_date, booking_id, seat_count, show_id, total_price, user_id } =
        recentBookings[i];
      bookingItem.innerHTML = `
      <p>${booking_id}</p>
      <p>${user_id}</p>
      <p>${show_id}</p>
      <p>${new Date(booking_date).toUTCString().split(',').slice(1)}</p>
      <p>${seat_count}</p>
      <p>${total_price}</p>`;
      bookingItems.appendChild(bookingItem);
    }
  }
};

reloadDashboard();

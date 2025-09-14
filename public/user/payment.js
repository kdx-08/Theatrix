const show_id = document.getElementById('show-id').innerText;
const back = document.getElementById('back');
const seats = document.getElementById('seats');
const amount = document.getElementById('ticket-price');
const proceed = document.getElementById('confirm');
const cancel = document.getElementById('cancel');

const addEvents = (price) => {
  seats.addEventListener('change', () => {
    amount.innerText = `₹${(seats.value * price * 1.18).toFixed(2)}`;
  });
  cancel.addEventListener('click', () => {
    history.back();
  });
};
back.addEventListener('click', () => {
  history.back();
});

const getDetails = async () => {
  const showDetails = await (await fetch('/api/stats/showDetails', { method: 'GET' })).json();
  const show = showDetails.find((show) => show.show_id === show_id);
  console.log(show);
  document.title = show.title;
  document.getElementById('movie-title').innerText = show.title;
  document.getElementById('movie-desc').innerText = `${show.name} | ${new Date(
    show.show_time
  ).toDateString()} | ${new Date(show.show_time).toTimeString().split(' ')[0].slice(0, -3)}`;
  document.getElementById('movie-poster').setAttribute('src', show.poster);
  document.getElementsByClassName('movie-name')[0].innerText = show.title;
  document.getElementsByClassName('details')[0].innerText = `${show.release_year} • ${Math.trunc(
    parseInt(show.duration) / 60
  )}h ${parseInt(show.duration) % 60}m`;
  document.getElementsByClassName('about')[0].innerText = show.genre;
  document.getElementById('seat-label').innerText = show.title;
  amount.innerText = `₹${(seats.value * show.price * 1.18).toFixed(2)}`;
  proceed.addEventListener('click', async () => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        show_id: show.show_id,
        amount: parseInt(amount.innerText.slice(1)),
        booking_date: new Date(),
        seat_count: seats.value,
      }),
    });
    if (response.ok) window.location.href = '/';
  });
  addEvents(show.price);
};

getDetails();

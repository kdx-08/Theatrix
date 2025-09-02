const movieForm = document.forms.movie;
const actionResponse = document.querySelector('.action-response');

movieForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = movieForm.id.value;
  const title = movieForm.title.value;
  const duration = movieForm.duration.value;
  const overview = movieForm.overview.value;
  const lang = movieForm.lang.value;
  const rating = movieForm.rating.value;
  const poster = movieForm.poster.value;
  const year = movieForm.year.value;

  const res = await fetch('/api/stats/add-movie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ id, title, duration, overview, lang, rating, poster, year }),
  });

  if (!res.ok) actionResponse.classList.add('invalid-response');
  else window.location.replace(window.location.origin + '/admin/movies');
});

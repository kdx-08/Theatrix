const theatreForm = document.forms.theatre;
const actionResponse = document.querySelector('.action-response');

theatreForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = theatreForm.name.value;
  const location = theatreForm.location.value;
  const status = theatreForm.status.value;

  const res = await fetch('/api/stats/add-theatre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, location, status }),
  });
  window.location.replace(window.location.origin + '/admin/theatres');
});

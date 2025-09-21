const form = document.forms.feedback;
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const rating = form.rating.value;
  const feedback = form.feedback.value;
  const response = await fetch('/api/addfeedback/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ rating, feedback }),
  });
  if (response.ok) {
    window.location.href = '/';
  }
});

const regForm = document.forms.register;
const loginForm = document.forms.login;
const actionResponse = document.querySelector('.action-response');

regForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = regForm.username.value;
  const email = regForm.email.value;
  const phone = regForm.phone.value;
  const password = regForm.password.value;
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, phone, password }),
  });
  if (!res.ok) actionResponse.classList.add('invalid-response');
  else window.location.replace(window.location.origin + '/');
});

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) actionResponse.classList.add('invalid-response');
  else window.location.replace(window.location.origin + '/');
});

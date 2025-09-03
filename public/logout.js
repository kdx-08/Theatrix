const data = document.querySelector('#data');

const logout = async () => {
  const res = await fetch('/api/auth/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!res.ok) window.location.replace(window.location.origin + '/');
  else {
    data.innerHTML = 'Please wait. You will be logged out and redirected to home page...';
    setTimeout(() => {
      window.location.replace(window.location.origin + '/');
    }, 1500);
  }
};

logout();

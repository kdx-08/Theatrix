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

  sales_card.innerHTML = `$${(await sales.json()).sum || 0}`;
  tickets_card.innerHTML = `${(await tickets.json()).sum || 0}`;
  users_card.innerHTML = `${(await users.json()).count}`;
  theatres_card.innerHTML = `${(await theatres.json()).count}`;
};

reloadDashboard();

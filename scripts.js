(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const hoursTables = document.querySelectorAll('table.hours');
  if (hoursTables.length) {
    const now = new Date();
    const day = now.getDay(); // 0 Sunday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    hoursTables.forEach((table) => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, index) => {
        if (index === (day === 0 ? 6 : day - 1)) {
          row.classList.add('active');
        }
      });

      const loc = table.dataset.location;
      const statusBadge = document.querySelector(`.status-badge[data-location="${loc}"]`);
      if (statusBadge) {
        const schedule = {
          union: [
            [6*60, 18*60],
            [6*60, 18*60],
            [6*60, 18*60],
            [6*60, 19*60],
            [6*60, 19*60],
            [7*60, 19*60],
            [7*60, 16*60],
          ],
          downtown: [
            [10*60, 22*60],
            [10*60, 22*60],
            [10*60, 23*60],
            [10*60, 23*60],
            [10*60, 24*60],
            [9*60, 24*60],
            [9*60, 21*60],
          ],
        };
        const hours = schedule[loc];
        if (hours) {
          const todayHours = hours[day];
          const isOpen = currentMinutes >= todayHours[0] && currentMinutes <= todayHours[1];
          statusBadge.textContent = isOpen ? 'Open Now' : 'Closed';
          statusBadge.classList.remove('status-open', 'status-closed');
          statusBadge.classList.add(isOpen ? 'status-open' : 'status-closed');
        } else {
          statusBadge.textContent = '';
        }
      }
    });
  }
})();

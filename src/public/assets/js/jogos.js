document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.getElementById('mobile-search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');

    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (mobileSearch.style.display === 'none' || mobileSearch.style.display === '') {
                mobileSearch.style.display = 'block';
                mobileSearch.querySelector('input').focus();
            } else {
                mobileSearch.style.display = 'none';
            }
        });
    }
});

const catalog = document.getElementById('catalog');
const errorMessage = document.getElementById('error-message');

fetch('https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(games => {
    games.forEach(game => {
      // Get the link element by id
      const linkElement = document.getElementById('link-' + game.name);
      const href = linkElement ? linkElement.getAttribute('href') : '#';

      // Create card element
      const card = document.createElement('a');
      card.className = 'card';
      card.href = href;
      card.target = '_self'; // open in same tab
      card.rel = 'noopener noreferrer';

      // Create image element
      const img = document.createElement('img');
      img.src = game.img;
      img.alt = game.name + " image";

      // Create title element
      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = game.name;

      card.appendChild(img);
      card.appendChild(title);
      catalog.appendChild(card);
    });
  })
  .catch(error => {
    errorMessage.textContent = 'Erro ao carregar os jogos: ' + error.message;
  });

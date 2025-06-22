document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');
  if (!cardsContainer) return;

  // Criar título acima dos cards
  const title = document.createElement('h2');
  title.textContent = 'Últimas notícias!';
  title.style.textAlign = 'center';
  title.style.marginTop = '40px';
  title.style.marginBottom = '20px';
  title.style.fontWeight = '700';
  title.style.color = '#343a40';
  cardsContainer.insertAdjacentElement('beforebegin', title);

  fetch('http://localhost:3000/carouselItems')
    .then(response => response.json())
    .then(items => {
      items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col';

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';
        card.style.borderRadius = '15px';
        card.style.overflow = 'hidden';
        card.style.transition = 'transform 0.3s ease';
        card.onmouseenter = () => card.style.transform = 'scale(1.05)';
        card.onmouseleave = () => card.style.transform = 'scale(1)';

        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.className = 'card-img-top';
        img.alt = item.title;
        img.style.borderRadius = '15px 15px 0 0';
        img.style.height = '180px';
        img.style.objectFit = 'cover';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex justify-content-center';

        const cardLink = document.createElement('a');
        cardLink.href = `detalhes.html?id=${item.id}`;
        cardLink.className = 'stretched-link';
        cardLink.setAttribute('aria-label', item.title);

        cardBody.appendChild(cardLink);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        cardsContainer.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os cards:', error);
    });
});

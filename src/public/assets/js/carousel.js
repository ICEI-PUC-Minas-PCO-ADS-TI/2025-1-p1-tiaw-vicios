document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.getElementById('carousel-container');
  if (!carouselContainer) return;

  // Buscar itens do carrossel do servidor JSON
  const items = [];

  fetch('http://localhost:3000/carouselItems')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => items.push(item));
      construirCarrossel(items);
    })
    .catch(error => {
      console.error('Erro ao buscar itens do carrossel:', error);
    });

  function construirCarrossel(items) {
    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    items.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.alt = item.searchTerm;
      img.className = 'd-block w-100 carousel-item-image';
      img.style.cursor = 'pointer';
      img.dataset.searchTerm = item.searchTerm;

      // Envolver imagem em uma div para item do carrossel
      const itemDiv = document.createElement('div');
      itemDiv.className = 'carousel-item';
      if (index === 0) itemDiv.classList.add('active');
      itemDiv.appendChild(img);

      carouselInner.appendChild(itemDiv);
    });

    // Criar div do container do carrossel
    const carousel = document.createElement('div');
    carousel.id = 'customCarousel';
    carousel.className = 'carousel slide';
    carousel.setAttribute('data-bs-ride', 'carousel');

    // Criar indicadores
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    items.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-bs-target', '#customCarousel');
      button.setAttribute('data-bs-slide-to', index);
      if (index === 0) {
        button.className = 'active';
        button.setAttribute('aria-current', 'true');
      }
      button.setAttribute('aria-label', `Slide ${index + 1}`);
      indicators.appendChild(button);
    });

    // Criar controles
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev';
    prevButton.type = 'button';
    prevButton.setAttribute('data-bs-target', '#customCarousel');
    prevButton.setAttribute('data-bs-slide', 'prev');
    prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next';
    nextButton.type = 'button';
    nextButton.setAttribute('data-bs-target', '#customCarousel');
    nextButton.setAttribute('data-bs-slide', 'next');
    nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Próximo</span>';

    // Adicionar todas as partes ao carrossel
    carousel.appendChild(indicators);
    carousel.appendChild(carouselInner);
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    // Adicionar carrossel ao container
    const carouselContainer = document.getElementById('carousel-container');
    carouselContainer.appendChild(carousel);

    // Inicializar carrossel do Bootstrap
    var bootstrapCarousel = new bootstrap.Carousel(carousel);

    // Adicionar evento de clique às imagens
    carouselInner.querySelectorAll('img.carousel-item-image').forEach(img => {
      img.addEventListener('click', () => {
        // Encontrar o item JSON correspondendo à src da imagem
        const clickedSrc = img.src;
        const clickedItem = items.find(item => {
          // Para lidar com URLs relativas vs absolutas, verificar se img.src termina com item.imgSrc
          return clickedSrc.endsWith(item.imgSrc);
        });
        if (clickedItem && clickedItem.id) {
          window.location.href = `pesquisa.html?id=${clickedItem.id}`;
        } else {
          // fallback: abrir pesquisa no google em nova aba
          window.open(`https://www.google.com/search?q=${encodeURIComponent(img.alt)}`, '_blank');
        }
      });
    });
  }
});

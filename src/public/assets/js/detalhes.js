document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('item-title');
  const imageElement = document.getElementById('item-image');
  const descriptionElement = document.getElementById('item-description');

  // Função para obter o parâmetro 'id' da URL
  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  const itemId = getIdFromUrl();
  if (!itemId) {
    titleElement.textContent = 'Item não encontrado';
    return;
  }

  // Buscar dados do item pelo id no servidor JSON
  fetch(`http://localhost:3000/carouselItems/${itemId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Item não encontrado');
      }
      return response.json();
    })
    .then(item => {
      titleElement.textContent = item.title;
      imageElement.src = item.imgSrc;
      imageElement.alt = item.title;
      descriptionElement.textContent = item.description;
    })
    .catch(error => {
      titleElement.textContent = 'Erro ao carregar o item';
      descriptionElement.textContent = error.message;
    });
});

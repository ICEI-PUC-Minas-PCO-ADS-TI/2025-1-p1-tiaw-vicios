$(document).ready(function () {
  const API_URL = "https://jsonvicios.vercel.app/cartaz";

  async function montarCards() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar dados");
      const cartaz = await response.json();

      const container = $('#cards-container');
      container.empty();

      cartaz.forEach(item => {
        const card = `
          <div class="card card-pesquisa" data-id="${item.id}">
            <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
            <div class="card-body">
              <h5 class="card-title">${item.titulo}</h5>
              <p class="card-text">${item.descricao}</p>
            </div>
          </div>
        `;
        container.append(card);
      });
    } catch (error) {
      console.error("Erro ao carregar cards:", error);
      $('#semResultado').text("Erro ao carregar os dados. Verifique o servidor.");
    }
  }

  // Montar os cards na página
  montarCards();

  // Redirecionar para detalhes ao clicar no card
  $(document).on('click', '.card-pesquisa', function () {
    const id = $(this).data('id');
    window.location.href = `detalhes-pesquisa.html?id=${id}`;
  });

  // Filtro de busca
  $('#search').on('keyup', function () {
    const filtro = $(this).val().toLowerCase();
    let temResultado = false;

    $('.card-pesquisa').each(function () {
      const titulo = $(this).find('.card-title').text().toLowerCase();
      const mostrar = titulo.includes(filtro);
      $(this).toggle(mostrar);
      if (mostrar) temResultado = true;
    });

    $('#semResultado').toggle(!temResultado);
  });

// PÁGINA DE DETALHES
if (window.location.pathname.includes("detalhes-pesquisa.html")) {
  const API_URL = "http://localhost:3000/cartaz";

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  async function carregarDetalhes() {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Item não encontrado");

      const item = await res.json();

      const detalhesHTML = `
        <h1>${item.titulo}</h1>
        <img src="${item.imagem}" alt="${item.titulo}" style="width: 300px;">
        <p><strong>Resumo:</strong> ${item.descricao}</p>
        <p><strong>Detalhes:</strong> ${item.detalhes || "Detalhes não disponíveis."}</p>
      `;

      document.getElementById("conteudo-pesquisa").innerHTML = detalhesHTML;
    } catch (error) {
      document.getElementById("conteudo-pesquisa").innerHTML = "<p>Item não encontrado!</p>";
      console.error(error);
    }
  }

  carregarDetalhes();

  
  $("#voltar").click(function () {
    window.location.href = "pesquisa-vital.html";
  });
}
});

  $("#voltar-index").click(function () {
  window.location.href = "index.html";
});
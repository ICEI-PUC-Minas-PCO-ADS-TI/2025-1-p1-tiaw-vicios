const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let current = 0;

// mostra slide
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// botao de passar para slide anterior
prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// botao de passar para proximo slide
nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

let intervalId;

// carrossel automático
function startAutoSlide() {
  intervalId = setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 10000); // 10 segundos
}

// para o carrossel automático
function stopAutoSlide() {
  clearInterval(intervalId);
}

// inicia ao carregar a pagina
startAutoSlide();

// pausa ao passar o mouse
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', stopAutoSlide);
carouselContainer.addEventListener('mouseleave', startAutoSlide);

// criar cards
let cards = [
    {
        id: 1,
        nome: "Card 1",
        imagem: "image/sem_imagem.png",
        texto: "Mensagem do card 1",
        link: "card1.html"
    },
    {
        id: 2,
        nome: "Card 2",
        imagem: "image/sem_imagem.png",
        texto: "Mensagem do card 2",
        link: "card2.html"
    },
    {
        id: 3,
        nome: "Card 3",
        imagem: "image/sem_imagem.png",
        texto: "Mensagem do card 3",
        link: "card3.html"
    }
];

// Cria os cards na index.html
function criaCards1() {
    let divCards1 = document.getElementById("divCards1");
    let strTextoHTML = '';

    for (let i = 0; i < 6 && i < cards.length; i++) {
        let card = cards[i];
        strTextoHTML += `
        <div>
            <div class="card">
                <img src="${card.imagem}" alt="${card.nome}">
                <div class="card-body">
                    <h3>${card.nome}</h3>
                    <button onclick="verDetalhes(${card.id})">Ver Detalhes</button>
                </div>
            </div>
        </div>
        `;
    }

    divCards1.innerHTML = strTextoHTML;
}

// carrega os card
window.onload = function () {
    criaCards1(); 
};

function verDetalhes(id) {
    const cardSelecionado = cards.find(c => c.id === id);
    localStorage.setItem("cardSelecionado", JSON.stringify(cardSelecionado));
    window.location.href = "detalhes.html";
}

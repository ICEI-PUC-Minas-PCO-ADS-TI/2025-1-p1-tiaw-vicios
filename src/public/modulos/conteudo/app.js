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

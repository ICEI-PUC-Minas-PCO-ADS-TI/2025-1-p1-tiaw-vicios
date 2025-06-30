// Registrar plugins do GSAP
if (typeof gsap !== 'undefined' && typeof Draggable !== 'undefined' && typeof InertiaPlugin !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin); // Certifique-se de registrar InertiaPlugin também
}

let isCurrentlyDragging = false;
const ball = document.querySelector(".ball");
let vx = 0, vy = 0, animation = null;
let lastX = 0, lastY = 0;

const bounds = {
  left: 0,
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight
};

function updateBounds() {
  bounds.right = window.innerWidth;
  bounds.bottom = window.innerHeight;
  bounds.left = 0;
  bounds.top = 0;
}

window.addEventListener("resize", updateBounds);

// NOVO CÓDIGO AQUI
let startTime = null;
let timerInterval = null;
const targetTimeInSeconds = 60; // 10 minutos * 60 segundos/minuto
const keywordCard = document.getElementById("keywordCard");
const closeKeywordCardBtn = document.getElementById("closeKeywordCard");

function startTimer() {
    if (startTime === null) { // Inicia o timer apenas uma vez
        startTime = Date.now();
        timerInterval = setInterval(checkTime, 1000); // Verifica a cada segundo
        console.log("Timer iniciado!");
    }
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
        console.log("Timer parado!");
    }
}

function checkTime() {
    if (startTime !== null) {
        const elapsedTime = (Date.now() - startTime) / 1000; // Tempo em segundos
        // console.log("Tempo decorrido:", elapsedTime.toFixed(0), "segundos"); // Para depuração

        if (elapsedTime >= targetTimeInSeconds) {
            showKeywordCard();
            stopTimer(); // Para o timer assim que a condição for atingida
        }
    }
}

function showKeywordCard() {
    keywordCard.classList.add("keyword-card--visible");
    // Você pode adicionar mais lógica aqui, como pausar o jogo ou outros efeitos
}

function hideKeywordCard() {
    keywordCard.classList.remove("keyword-card--visible");
    // Você pode adicionar lógica para reiniciar o jogo ou permitir que continue
}

// Adiciona event listener para o botão de fechar o card
closeKeywordCardBtn.addEventListener("click", () => {
    hideKeywordCard();
});
// FIM DO NOVO CÓDIGO

const draggable = new Draggable(ball, {
  bounds: window,
  onPress() {
    isCurrentlyDragging = true;
    if (animation) animation.kill();
    lastX = this.x;
    lastY = this.y;
    // NOVO CÓDIGO AQUI: Inicia o timer na primeira interação
    startTimer();
    // FIM DO NOVO CÓDIGO
  },
  onDrag() {
    vx = this.x - lastX;
    vy = this.y - lastY;
    lastX = this.x;
    lastY = this.y;
  },
  onRelease() {
    isCurrentlyDragging = false;
    animateBounce(this.x, this.y, vx, vy);
  }
});

function animateBounce(x, y, vx, vy) {
  let radius = ball.offsetWidth / 2;
  function move() {
    x += vx;
    y += vy;
    // Rebater nas paredes
    if (x - radius < bounds.left) {
      x = bounds.left + radius;
      vx *= -0.7;
    } else if (x + radius > bounds.right) {
      x = bounds.right - radius;
      vx *= -0.7;
    }
    if (y - radius < bounds.top) {
      y = y + radius; // Corrigido para usar 'y' em vez de 'bounds.top'
      vy *= -0.7;
    } else if (y + radius > bounds.bottom) {
      y = bounds.bottom - radius;
      vy *= -0.7;
    }
    // Fricção
    vx *= 0.98;
    vy *= 0.98;
    // Parar se velocidade for muito baixa
    if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) {
      gsap.set(ball, {x, y});
      return;
    }
    gsap.set(ball, {x, y});
    animation = gsap.delayedCall(0.016, move);
  }
  move();
}

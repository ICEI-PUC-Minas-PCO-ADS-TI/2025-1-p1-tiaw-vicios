// Elementos do DOM
const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const pauseBtn = document.getElementById("pauseBtn");
const gameContainer = document.getElementById("gameContainer");
const mainContainer = document.querySelector(".main-container");
const infoModal = document.getElementById("infoModal");
const enigmaCard = document.getElementById("enigmaCard"); // Novo elemento
const closeEnigmaCardBtn = document.getElementById("closeEnigmaCard"); // Novo elemento

// Variáveis do jogo
let score = 0;
let interval;
let gameSpeed = 1500;
let isPaused = false;
let isGameRunning = false;
let highScore = localStorage.getItem("pianoTilesHighScore") || 0;
let enigmaShown = false; // Nova variável para controlar se o enigma já foi mostrado

// Sons do jogo (usando Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log("Áudio não disponível");
  }
}

// Função para criar efeito de partículas
function createParticleEffect(x, y) {
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    gameArea.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 600);
  }
}

// Função para exibir o card de enigma
function showEnigmaCard() {
  enigmaCard.classList.add("enigma-card--visible");
  enigmaShown = true;
}

// Função para esconder o card de enigma
function hideEnigmaCard() {
  enigmaCard.classList.remove("enigma-card--visible");
}

// Função para criar uma linha de teclas
function createRow() {
  if (!isGameRunning || isPaused) return;
  
  const row = document.createElement("div");
  row.classList.add("tile-row");
  row.style.top = "-100px";

  const blackIndex = Math.floor(Math.random() * 4);

  for (let i = 0; i < 4; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    
    if (i === blackIndex) {
      tile.classList.add("black");
      tile.onclick = (e) => {
        e.stopPropagation();
        
        // Efeito visual
        tile.style.background = "linear-gradient(135deg, #00b894, #00a085)";
        
        // Efeito de partículas
        const rect = tile.getBoundingClientRect();
        const gameRect = gameArea.getBoundingClientRect();
        createParticleEffect(
          rect.left - gameRect.left + rect.width / 2,
          rect.top - gameRect.top + rect.height / 2
        );
        
        // Som
        playSound(440 + (score * 10), 0.1);
        
        // Remover linha e aumentar pontuação
        row.remove();
        score++;
        scoreEl.textContent = "Pontuação: " + score;

        // Aumentar velocidade gradualmente
        if (score % 5 === 0 && gameSpeed > 800) {
          gameSpeed -= 50;
          clearInterval(interval);
          interval = setInterval(createRow, gameSpeed);
        }
      };
    } else {
      // Adicionar evento de clique nas teclas brancas (erro)
      tile.onclick = (e) => {
        e.stopPropagation();
        gameOver("Você clicou em uma tecla branca!");
      };
    }
    
    row.appendChild(tile);
  }

  gameArea.appendChild(row);

  // Verificar se alguma tecla preta passou
  setTimeout(() => {
    if (row.parentNode && row.querySelector(".black")) {
      gameOver("Você perdeu uma tecla preta!");
    }
  }, gameSpeed + 500);

  // Remover linha após sair da tela
  setTimeout(() => {
    if (row.parentNode) {
      row.remove();
    }
  }, gameSpeed + 1000);
}

// Iniciar o jogo
function startGame() {
  if (isGameRunning) return;
  
  isGameRunning = true;
  isPaused = false;
  gameArea.innerHTML = "";
  gameSpeed = 1500;
  enigmaShown = false; // Resetar ao iniciar novo jogo
  hideEnigmaCard(); // Esconder card ao iniciar novo jogo
  
  // Atualizar botão de pausa
  pauseBtn.innerHTML = "<span class=\"btn-icon\">⏸️</span> Pausar";
  pauseBtn.style.display = "inline-flex";
  restartBtn.style.display = "none";
  
  interval = setInterval(createRow, gameSpeed);
}

// Pausar/Despausar o jogo
function togglePause() {
  if (!isGameRunning) return;
  
  isPaused = !isPaused;
  
  if (isPaused) {
    clearInterval(interval);
    pauseBtn.innerHTML = "<span class=\"btn-icon\">▶️</span> Continuar";
    gameArea.classList.add("game-paused");
  } else {
    interval = setInterval(createRow, gameSpeed);
    pauseBtn.innerHTML = "<span class=\"btn-icon\">⏸️</span> Pausar";
    gameArea.classList.remove("game-paused");
  }
}

// Fim de jogo
function gameOver(message = "Fim de jogo!") {
  isGameRunning = false;
  isPaused = false;
  clearInterval(interval);
  
  // Atualizar high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("pianoTilesHighScore", highScore);
    message += `\n🎉 Novo recorde: ${highScore} pontos!`;
  } else {
    message += `\nSua pontuação: ${score} pontos\nRecorde: ${highScore} pontos`;
  }
  
  // Efeito visual de game over
  gameArea.classList.add("game-over");
  
  // Som de game over
  playSound(200, 0.5);
  
  setTimeout(() => {
    alert(message);
    gameArea.classList.remove("game-over");
    restartBtn.style.display = "inline-flex";
    pauseBtn.style.display = "none";
    
    // Exibir o card de enigma após o game over se ainda não foi mostrado
    if (!enigmaShown) {
      showEnigmaCard();
    }
  }, 500);
}

// Reiniciar o jogo
function restartGame() {
  gameArea.innerHTML = "";
  score = 0;
  scoreEl.textContent = "Pontuação: 0";
  gameArea.classList.remove("game-over", "game-paused");
  startGame();
}

// Navegação - Iniciar novo jogo
function startNewGame() {
  // Esconder menu principal
  mainContainer.style.display = "none";
  
  // Mostrar tela do jogo
  gameContainer.style.display = "flex";
  
  // Resetar variáveis
  score = 0;
  scoreEl.textContent = "Pontuação: 0";
  gameArea.innerHTML = "";
  gameArea.classList.remove("game-over", "game-paused");
  enigmaShown = false; // Resetar ao iniciar novo jogo
  hideEnigmaCard(); // Esconder card ao iniciar novo jogo
  
  // Iniciar o jogo
  startGame();
}

// Navegação - Voltar ao menu
function backToMenu() {
  // Parar o jogo
  isGameRunning = false;
  isPaused = false;
  clearInterval(interval);
  
  // Esconder tela do jogo
  gameContainer.style.display = "none";
  
  // Mostrar menu principal
  mainContainer.style.display = "flex";
  
  // Limpar área do jogo
  gameArea.innerHTML = "";
  gameArea.classList.remove("game-over", "game-paused");
  enigmaShown = false; // Resetar ao voltar ao menu
  hideEnigmaCard(); // Esconder card ao voltar ao menu
}

// Modal de informações
function showInfo() {
  infoModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  infoModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Fechar modal clicando fora dele
if (infoModal) {
  infoModal.addEventListener("click", (e) => {
    if (e.target === infoModal) {
      closeModal();
    }
  });
}

// Event listener para fechar o card de enigma
if (closeEnigmaCardBtn) {
  closeEnigmaCardBtn.addEventListener("click", () => {
    hideEnigmaCard();
  });
}

// Fechar card de enigma clicando fora dele
if (enigmaCard) {
  enigmaCard.addEventListener("click", (e) => {
    if (e.target === enigmaCard) {
      hideEnigmaCard();
    }
  });
}

// Controles de teclado
document.addEventListener("keydown", (e) => {
  switch(e.key) {
    case " ": // Espaço para pausar
      e.preventDefault();
      if (gameContainer.style.display !== "none") {
        togglePause();
      }
      break;
    case "Escape": // ESC para voltar ao menu
      if (gameContainer.style.display !== "none") {
        backToMenu();
      } else if (infoModal && infoModal.style.display !== "none") {
        closeModal();
      } else if (enigmaCard && enigmaCard.classList.contains("enigma-card--visible")) {
        hideEnigmaCard();
      }
      break;
    case "r": // R para reiniciar
    case "R":
      if (gameContainer.style.display !== "none" && !isGameRunning) {
        restartGame();
      }
      break;
    case "1":
    case "2":
    case "3":
    case "4":
      // Controles numéricos para as colunas
      if (isGameRunning && !isPaused) {
        const columnIndex = parseInt(e.key) - 1;
        const rows = gameArea.querySelectorAll(".tile-row");
        if (rows.length > 0) {
          const bottomRow = rows[rows.length - 1];
          const tiles = bottomRow.querySelectorAll(".tile");
          if (tiles[columnIndex]) {
            tiles[columnIndex].click();
          }
        }
      }
      break;
  }
});

// Prevenir zoom em dispositivos móveis
document.addEventListener("touchstart", (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener("touchend", (e) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar high score na página inicial se existir
  if (highScore > 0) {
    const gameInfo = document.querySelector(".game-info");
    if (gameInfo) {
      const highScoreP = document.createElement("p");
      highScoreP.innerHTML = `<strong>🏆 Seu recorde: ${highScore} pontos</strong>`;
      highScoreP.style.color = "#667eea";
      highScoreP.style.fontSize = "1.1rem";
      highScoreP.style.marginTop = "10px";
      gameInfo.appendChild(highScoreP);
    }
  }
  
  // Garantir que o contexto de áudio seja iniciado
  document.addEventListener("click", () => {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }, { once: true });
});

// Função para detectar dispositivo móvel
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustes para dispositivos móveis
if (isMobileDevice()) {
  // Adicionar classe para estilos específicos de mobile
  document.body.classList.add("mobile-device");
  
  // Prevenir scroll durante o jogo
  if (gameArea) {
    gameArea.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });
  }
}


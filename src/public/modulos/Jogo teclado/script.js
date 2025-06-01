const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
let score = 0;
let interval;

function createRow() {
  const row = document.createElement('div');
  row.classList.add('tile-row');

  const blackIndex = Math.floor(Math.random() * 4);

  for (let i = 0; i < 4; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (i === blackIndex) {
      tile.classList.add('black');
      tile.onclick = () => {
        row.remove();
        score++;
        scoreEl.textContent = 'Pontuação: ' + score;
      };
    }
    row.appendChild(tile);
  }

  gameArea.prepend(row);

  if (gameArea.childNodes.length > 5) {
    gameOver();
  }
}

function startGame() {
  interval = setInterval(createRow, 1000);
}

function gameOver() {
  clearInterval(interval);
  alert('Fim de jogo! Sua pontuação foi: ' + score);
  restartBtn.style.display = 'inline-block';
}

function restartGame() {
  gameArea.innerHTML = '';
  score = 0;
  scoreEl.textContent = 'Pontuação: 0';
  restartBtn.style.display = 'none';
  startGame();
}

startGame();

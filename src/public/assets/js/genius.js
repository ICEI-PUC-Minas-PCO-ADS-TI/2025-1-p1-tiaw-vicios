const _data = {
	gameOn: false,
	timeout: undefined,
	sounds: [],

	strict: false,
	playerCanPlay: false,
	score: 0,
	gameSequence: [],
	playerSequence: []
};

const _gui = {
	counter: document.querySelector(".gui__counter"),
	switch: document.querySelector(".gui__btn-switch"),
	led: document.querySelector(".gui__led"),
	strict: document.querySelector(".gui__btn--strict"),
	start: document.querySelector(".gui__btn--start"),
	pads: document.querySelectorAll(".game__pad"),
    // NOVO CÓDIGO AQUI
    enigmaCard: document.getElementById("enigmaCard"),
    closeEnigmaCardBtn: document.getElementById("closeEnigmaCard")
    // FIM DO NOVO CÓDIGO
}

const _soundUrls = [
	"assets/audio/simonSound1.mp3",
	"assets/audio/simonSound2.mp3",
	"assets/audio/simonSound3.mp3",
	"assets/audio/simonSound4.mp3"
];

// Remove a pré-carga dos sons
// _soundUrls.forEach(sndPath => {
// 	const audio = new Audio(sndPath);
// 	_data.sounds.push(audio);
// });

_gui.switch.addEventListener("click", () => {
	_data.gameOn = _gui.switch.classList.toggle("gui__btn-switch--on");

	_gui.counter.classList.toggle("gui__counter--on");
	_gui.counter.innerHTML = "--";

	_data.strict = false;
	_data.playerCanPlay = false;
	_data.score = 0;
	_data.gameSequence = [];
	_data.playerSequence = [];

	disablePads();
	changePadCursor("auto");

	_gui.led.classList.remove("gui__led--active");

    // NOVO CÓDIGO AQUI
    // Garante que o card do enigma esteja oculto se o jogo for desligado
    if (!_data.gameOn) {
        hideEnigmaCard();
    }
    // FIM DO NOVO CÓDIGO
});

_gui.strict.addEventListener("click", () => {

	if (!_data.gameOn) return;
	_data.strict = _gui.led.classList.toggle("gui__led--active");

});

_gui.start.addEventListener("click", () => {
	startGame();
});

const padListener = (e) => {
	if (!_data.playerCanPlay)
		return;

	let soundId;
	_gui.pads.forEach((pad, key) => {
		if (pad === e.target)
			soundId = key;

	});

	e.target.classList.add("game__pad--active");

	new Audio(_soundUrls[soundId]).play();
	_data.playerSequence.push(soundId);

	setTimeout(() => {
		e.target.classList.remove("game__pad--active");

		const currentMove = _data.playerSequence.length - 1;

		if (_data.playerSequence[currentMove] !== _data.gameSequence[currentMove]) {
			_data.playerCanPlay = false;
			disablePads();
			resetOrPlayAgain();

		}
		else if (currentMove === _data.gameSequence.length - 1) {
			newColor();
			playSequence();
		}

		waitForPlayerClick();
	}, 250); 

}

_gui.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {
    if (!_data.gameOn) return;
    
    _data.score = 0;
    _data.gameSequence = [];
    _data.playerSequence = [];
    
    blink("--", () => {
        newColor();
        playSequence();
    });
}

const setScore = () => {
	const score = _data.score.toString();
	const display = "00".substring(0, 2 - score.length) + score;
	_gui.counter.innerHTML = display;
}

const newColor = () => {
    // CÓDIGO MODIFICADO AQUI
	if (_data.score === 12) {
        showEnigmaCard(); // Exibe o card do enigma
        _data.gameOn = false; // Para o jogo
        _data.playerCanPlay = false;
        disablePads();
        changePadCursor("auto");
        _gui.switch.classList.remove("gui__btn-switch--on"); // Desliga o switch visualmente
        _gui.counter.classList.remove("gui__counter--on"); // Desliga o contador visualmente
        _gui.led.classList.remove("gui__led--active"); // Desliga o LED de strict
		return; // Sai da função para não adicionar mais cores ou incrementar o score
	}
    // FIM DO CÓDIGO MODIFICADO

	_data.gameSequence.push(Math.floor(Math.random() * 4));
	_data.score++;

	setScore();
}

const playSequence = () => {
	let counter = 0;
	let padOn = true;

	_data.playerCanPlay = false;
	_data.playerSequence = [];

	changePadCursor("auto");

	const interval = setInterval(() => {
		if (!_data.gameOn) {
			clearInterval(interval);
			disablePads();
			return;
		}

		if (padOn) {
			if (counter === _data.gameSequence.length) {
				clearInterval(interval);
				disablePads();
				waitForPlayerClick();
				changePadCursor("pointer");
				_data.playerCanPlay = true;
				return;

			}

			const sndId = _data.gameSequence[counter];
			const pad = _gui.pads[sndId];

			new Audio(_soundUrls[sndId]).play();
			pad.classList.add("game__pad--active");
			counter++;

		}
		else {
			disablePads();

		}

		padOn = !padOn;

	}, 750)

}

const blink = (text, callback) => {
	let counter = 0;
	on = true;

	_gui.counter.innerHTML = text;

	const interval = setInterval(() => {
		if (!_data.gameOn) {
			clearInterval(interval);
			_gui.counter.classList.remove("gui__counter--on");
			return;
		}
		if (on) {
			_gui.counter.classList.remove("gui__counter--on");

		}
		else {
			_gui.counter.classList.add("gui__counter--on");

			if (++counter === 3) {
				clearInterval(interval);
				callback();
			}

		}

		on = !on;

	}, 250);
}

const waitForPlayerClick = () => {
	clearTimeout(_data.timeout);

	_data.timeout = setTimeout(() => {
		if (!_data.playerCanPlay)
			return;

		disablePads();
		resetOrPlayAgain();

	}, 5000);
}
const resetOrPlayAgain = () => {
    _data.playerCanPlay = false;
    _data.playerSequence = [];	if (_data.strict) {
		blink("!!", () => {
			_data.score = 0;
			_data.gameSequence = [];
			startGame();
		});
	}
	else {
		blink("!!", () => {
			setScore();
			playSequence();
		});
	}

}

const changePadCursor = (cursorType) => {
	_gui.pads.forEach(pad => {
		pad.style.cursor = cursorType;
	}); 
}

const disablePads = () => {
	_gui.pads.forEach(pad => {
		pad.classList.remove("game__pad--active");
	});
}

// NOVO CÓDIGO AQUI
// Função para exibir o card do enigma
const showEnigmaCard = () => {
    _gui.enigmaCard.classList.add("enigma-card--visible");
    _gui.counter.innerHTML = "!!"; // Exibe "!!" no contador
    _gui.counter.classList.add("gui__counter--on"); // Mantém o contador ligado
}

// Função para ocultar o card do enigma
const hideEnigmaCard = () => {
    _gui.enigmaCard.classList.remove("enigma-card--visible");
    _gui.counter.innerHTML = "--"; // Reseta o display do contador
}

// Adiciona event listener para o botão de fechar o card
_gui.closeEnigmaCardBtn.addEventListener("click", () => {
    hideEnigmaCard();
    // O jogo já está parado neste ponto. O usuário pode clicar em "start" para jogar novamente.
});
// FIM DO NOVO CÓDIGO

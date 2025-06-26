var perguntas = document.getElementById("quiz");

fetch('http://localhost:3000/questoes')
  .then(response => response.json())
  .then(data => {
    let currentIndex = 0;
    let score = 0;

    const h1 = document.getElementById("titu")
    h1.innerHTML= `
      <h1 id="quiz-header">Quiz</h1>
    `;

    // Create quiz container
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container';
    perguntas.appendChild(quizContainer);

    // Create question container
    const questionDiv = document.createElement('div');
    questionDiv.id = 'question-container';
    quizContainer.appendChild(questionDiv);

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    quizContainer.appendChild(buttonsContainer);

    // Create true button
    const verda = document.createElement('button');
    verda.id = 'verdadeiro';
    verda.textContent = 'Verdade';
    buttonsContainer.appendChild(verda);

    // Create false button
    const falso = document.createElement('button');
    falso.id = 'falso';
    falso.textContent = 'Falso';
    buttonsContainer.appendChild(falso);

    // Create feedback container
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    quizContainer.appendChild(feedback);

    // Create score container
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    scoreDiv.style.marginTop = '20px';
    scoreDiv.style.fontWeight = '700';
    scoreDiv.style.fontSize = '1.2rem';
    scoreDiv.style.color = '#f0e9ff';
    quizContainer.appendChild(scoreDiv);

    function showQuestion(index) {
      if(index >= data.length){
        questionDiv.innerHTML = `<p>Quiz concluído! Você acertou ${score} de ${data.length} perguntas.</p>`;
        verda.disabled = true;
        falso.disabled = true;
        feedback.textContent = '';
        return;
      }
      const q = data[index];
      questionDiv.innerHTML = `<p><strong>Pergunta ${q.id}:</strong> ${q.question}</p>`;
      verda.disabled = false;
      falso.disabled = false;
      feedback.textContent = '';
      updateScore();
    }

    function updateScore() {
      scoreDiv.textContent = `Acertos: ${score} / ${data.length}`;
    }

    verda.addEventListener('click', () => {
      if (currentIndex < data.length) {
        if(data[currentIndex].answer == true){
          score++;
          currentIndex++;
          showQuestion(currentIndex);
          feedback.textContent = "Você Acertou!";
          updateScore();
        } else {
          currentIndex++;
          showQuestion(currentIndex);
          feedback.textContent = "Você errou, mas vamos para a próxima!";
          updateScore();
        }
      }
    });

    falso.addEventListener('click', () => {
      if (currentIndex < data.length) {
        if(data[currentIndex].answer == false){
          score++;
          currentIndex++;
          showQuestion(currentIndex);
          feedback.textContent = "Você Acertou!";
          updateScore();
        } else {
          currentIndex++;
          showQuestion(currentIndex);
          feedback.textContent = "Você errou, mas vamos para a próxima!";
          updateScore();
        }
      }
    });

    showQuestion(currentIndex);
    updateScore();
  })
  .catch(error => {
    perguntas.innerHTML = '<p>Erro ao carregar o quiz.</p>';
    console.error('Erro ao carregar quiz.json:', error);
  });

var perguntas = document.getElementById("quiz");

// Função para atualizar o progresso do quiz no db.json
async function updateQuizProgress(userId) {
  if (!userId) {
    console.error("quiz.js: ID do usuário não encontrado para atualizar o progresso.");
    return;
  }

  try {
    // 1. Buscar os dados atuais do usuário
    const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();

    // VERIFICAÇÃO: Se o quiz já foi concluído, não faz nada
    if (userData.progresso && userData.progresso.quizGeralConcluido) {
      console.log("quiz.js: Quiz já concluído para este usuário. Progresso não será atualizado novamente.");
      return;
    }

    // 2. Incrementar quizzesConcluidos para ALCOOL e TABACO
    if (userData.progresso) {
      if (userData.progresso.alcool) {
        userData.progresso.alcool.quizzesConcluidos++;
      }
      if (userData.progresso.tabaco) {
        userData.progresso.tabaco.quizzesConcluidos++;
      }
      // 3. Marcar o quiz geral como concluído para este usuário
      userData.progresso.quizGeralConcluido = true;

    } else {
      console.error("quiz.js: Estrutura de progresso não encontrada para o usuário.");
      return;
    }

    // 4. Enviar a atualização para o db.json
    const updateResponse = await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progresso: userData.progresso })
    });

    if (!updateResponse.ok) {
      throw new Error(`HTTP error! status: ${updateResponse.status}`);
    }

    console.log("quiz.js: Progresso do quiz atualizado com sucesso!");
    alert("Quiz concluído! Seu progresso foi atualizado.");

  } catch (error) {
    console.error("quiz.js: Erro ao atualizar o progresso do quiz:", error);
    alert("Ocorreu um erro ao atualizar seu progresso. Tente novamente.");
  }
}

fetch("https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/questoes")
  .then(response => response.json())
  .then(data => {
    let currentIndex = 0;
    let score = 0;
    // Removida a flag quizCompleted local, pois usaremos a do db.json

    const h1 = document.getElementById("titu")
    h1.innerHTML= `
      <h1 id="quiz-header">Quiz</h1>
    `;

    // Create quiz container
    const quizContainer = document.createElement("div");
    quizContainer.id = "quiz-container";
    perguntas.appendChild(quizContainer);

    // Create question container
    const questionDiv = document.createElement("div");
    questionDiv.id = "question-container";
    quizContainer.appendChild(questionDiv);

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";
    quizContainer.appendChild(buttonsContainer);

    // Create true button
    const verda = document.createElement("button");
    verda.id = "verdadeiro";
    verda.textContent = "Verdade";
    buttonsContainer.appendChild(verda);

    // Create false button
    const falso = document.createElement("button");
    falso.id = "falso";
    falso.textContent = "Falso";
    buttonsContainer.appendChild(falso);

    // Create feedback container
    const feedback = document.createElement("div");
    feedback.id = "feedback";
    quizContainer.appendChild(feedback);

    // Create score container
    const scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    scoreDiv.style.marginTop = "20px";
    scoreDiv.style.fontWeight = "700";
    scoreDiv.style.fontSize = "1.2rem";
    scoreDiv.style.color = "#f0e9ff";
    quizContainer.appendChild(scoreDiv);

    // Função para verificar se o quiz já foi concluído pelo usuário
    async function checkQuizStatus() {
        const currentUserId = localStorage.getItem("userId");
        if (!currentUserId) {
            console.warn("quiz.js: ID do usuário não encontrado no localStorage ao carregar o quiz.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${currentUserId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userData = await response.json();
            if (userData.progresso && userData.progresso.quizGeralConcluido) {
                questionDiv.innerHTML = `<p>Você já concluiu este quiz!</p><p>Você acertou ${userData.progresso.alcool.quizzesConcluidos} de ${userData.progresso.alcool.totalQuizzes} perguntas.</p>`; // Pode ajustar a mensagem
                verda.disabled = true;
                falso.disabled = true;
                feedback.textContent = "";
                scoreDiv.textContent = ""; // Limpa o score
                return true; // Indica que o quiz já foi concluído
            }
        } catch (error) {
            console.error("quiz.js: Erro ao verificar status do quiz:", error);
        }
        return false; // Indica que o quiz não foi concluído ainda
    }

    // Chamar a função ao carregar a página
    checkQuizStatus().then(quizAlreadyCompleted => {
        if (!quizAlreadyCompleted) {
            showQuestion(currentIndex);
            updateScore();
        }
    });

    function showQuestion(index) {
      if(index >= data.length){
        questionDiv.innerHTML = `<p>Quiz concluído! Você acertou ${score} de ${data.length} perguntas.</p>`;
        verda.disabled = true;
        falso.disabled = true;
        feedback.textContent = "";

        // Obter o userId do localStorage
        const currentUserId = localStorage.getItem("userId");
        // A flag quizCompleted local foi removida, a verificação é feita no updateQuizProgress
        if (currentUserId) {
          updateQuizProgress(currentUserId);
        }
        return;
      }
      const q = data[index];
      questionDiv.innerHTML = `<p><strong>Pergunta ${q.id}:</strong> ${q.question}</p>`;
      verda.disabled = false;
      falso.disabled = false;
      feedback.textContent = "";
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

  })
  .catch(error => {
    perguntas.innerHTML = '<p>Erro ao carregar o quiz.</p>';
    console.error('Erro ao carregar quiz.json:', error);
  });



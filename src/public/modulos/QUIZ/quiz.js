

var perguntas = document.getElementById("quiz");

fetch('quiz.json')
  .then(response => response.json())
  .then(data => {
    let currentIndex = 0;
    perguntas.innerHTML = '<h1>Quiz</h1>';

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    perguntas.appendChild(questionDiv);

    const navDiv = document.createElement('div');
    navDiv.classList.add('navigation');
    perguntas.appendChild(navDiv);

    const verda = document.getElementById('verdadeiro');
    verda.textContent = 'Verdade';
    
    navDiv.appendChild(verda);

    function showQuestion(index) {
      const q = data.questoes[index];
      questionDiv.innerHTML = `<p><strong>Pergunta ${q.id}:</strong> ${q.question}</p>`;
      verda.disabled = (index >= data.questoes.length - 1);
      falso.disabled = (index >= data.questoes.length - 1);
    }

    verda.addEventListener('click', () => {
      if (currentIndex < data.questoes.length - 1) {
        if(data.questoes[currentIndex].answer == true){
        currentIndex++;
        showQuestion(currentIndex);
        } else{
          alert("Você não pode continuar, pois ainda não respondeu a pergunta anterior");
        }
      }
      
    });
    const falso = document.getElementById('falso');
    falso.textContent = 'Falso';

    falso.addEventListener('click', () => {
      if (currentIndex < data.questoes.length - 1) {
        if(data.questoes[currentIndex].answer == false ){
        currentIndex++;
        showQuestion(currentIndex);
        } else{
          alert("Você não pode continuar, pois ainda não respondeu a pergunta anterior");
        }
      }
      
    });

    showQuestion(currentIndex);
  })
  .catch(error => {
    perguntas.innerHTML = '<p>Erro ao carregar o quiz.</p>';
    console.error('Erro ao carregar quiz.json:', error);
  });

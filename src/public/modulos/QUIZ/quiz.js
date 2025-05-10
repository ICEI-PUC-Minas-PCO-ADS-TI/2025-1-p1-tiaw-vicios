

var perguntas = document.getElementById("quiz");

fetch('quiz.json')
  .then(response => response.json())
  .then(data => {
    let currentIndex = 0;

    const h1 = document.getElementById("titu")
    h1.innerHTML= `
      <h1>Quiz</h1>
    `;
    h1.style.backgroundColor= '#9D6EF9';
    h1.style.borderRadius = '20%'
    h1.style.textAlign = 'center'
    h1.style.width = '40%'
    h1.style.height = '10%'
    h1.style.margin = 'auto'
    h1.style.padding = '10px'
    h1.style.color = 'white'
    h1.style.fontFamily = 'Arial, sans-serif'
    h1.style.fontSize = '30px'
    
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

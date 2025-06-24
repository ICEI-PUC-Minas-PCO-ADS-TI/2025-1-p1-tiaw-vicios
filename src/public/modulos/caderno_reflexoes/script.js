// script.js

// Array com 366 perguntas reflexivas (só alguns exemplos)
const perguntas = [
  "O que você sentiu de mais forte hoje?",
  "Qual momento do seu dia trouxe mais paz interior?",
  "Como você cuidou de si mesmo(a) hoje?",
  "Que pensamento positivo você teve hoje?",
  "Qual desafio enfrentado hoje te fez crescer?",
  "O que fez você sorrir hoje?",
  "Em que momento você se sentiu mais conectado(a) consigo mesmo(a)?",
  "Que lição você aprendeu no dia de hoje?",
  "O que você poderia fazer diferente amanhã para se sentir melhor?",
  "Como você demonstrou amor a alguém hoje?",
  "Qual hábito saudável você praticou hoje?",
  "O que despertou sua curiosidade durante o dia?",
  "Qual foi a sua maior conquista pessoal hoje?",
  "De que você foi mais grato(a) hoje?",
  "Como você lidou com uma situação difícil hoje?",
  "Que coisa pequena trouxe alegria para o seu dia?",
  "O que você fez para aliviar seu estresse hoje?",
  "Qual sentimento predominou durante seu dia?",
  "O que você gostaria de lembrar deste dia daqui a um ano?",
  "Que promessa você fez para si mesmo(a) hoje?",
  "Como seu corpo se sentiu ao longo do dia?",
  "Qual foi o momento mais calmo do seu dia?",
  "Que pensamento te motivou hoje?",
  "Qual hábito você gostaria de melhorar amanhã?",
  "Que pessoa impactou seu dia positivamente?",
  "Como você expressou sua criatividade hoje?",
  "Qual palavra descreve seu dia?",
  "O que você fez para ajudar alguém hoje?",
  "Qual foi o maior aprendizado do dia?",
  "Como você pode tornar amanhã melhor que hoje?",
  "Que coisa você evitou hoje e que gostaria de enfrentar?",
  "Qual foi seu momento de silêncio hoje?",
  "O que você fez que te deixou orgulhoso(a) hoje?",
  "Como você lidou com uma emoção difícil hoje?",
  "Qual foi a maior distração que você teve hoje?",
  "O que você fez para se sentir mais presente?",
  "Qual foi sua atitude mais generosa hoje?",
  "O que você descobriu sobre você mesmo(a) hoje?",
  "Como foi seu relacionamento com as pessoas hoje?",
  "Qual foi o melhor conselho que você ouviu hoje?",
  "O que você deseja para amanhã?",
  "Como você mostrou paciência hoje?",
  "Qual momento do dia você gostaria de reviver?",
  "Que atividade te trouxe energia hoje?",
  "Como você se sentiu ao acordar hoje?",
  "Que desafio você superou hoje?",
  "Qual pensamento limitante você identificou hoje?",
  "O que te inspirou no dia de hoje?",
  "Que livro, filme ou música marcou seu dia?",
  "Como você contribuiu para o seu bem-estar hoje?",
  "O que você aprendeu sobre suas emoções hoje?",
  "Qual atitude você gostaria de repetir amanhã?",
  "Como você lidou com uma crítica hoje?",
  "Qual foi seu momento mais criativo?",
  "Que sonho você alimentou hoje?",
  "O que te trouxe calma no dia de hoje?",
  "Qual foi seu maior momento de gratidão?",
  "Que mudança você deseja ver em si mesmo(a)?",
  "O que você fez para cuidar da sua mente hoje?",
  "Qual foi seu gesto mais gentil hoje?",
  "O que você fez para fortalecer sua confiança?",
  "Como você demonstrou coragem hoje?",
  "Qual foi o melhor momento de conexão com alguém?",
  "Que sentimento você gostaria de cultivar mais?",
  "O que você fez para relaxar hoje?",
  "Como você aprendeu a se perdoar?",
  "Que hábito saudável você iniciou hoje?",
  "Qual foi o melhor conselho que você deu a alguém?",
  "O que você fez para se sentir seguro(a)?",
  "Como você cuidou do seu corpo hoje?",
  "Qual foi sua maior surpresa hoje?",
  "O que você gostaria de agradecer hoje?",
  "Que pensamento te trouxe esperança?",
  "Como você escolheu reagir a um desafio?",
  "Qual momento você gostaria de celebrar?",
  "O que você fez para fortalecer suas amizades?",
  "Que coisa você fez que te fez sentir vivo(a)?",
  "Como você expressou sua gratidão hoje?",
  "O que te motivou a continuar?",
  "Que meta você definiu para amanhã?",
  "Qual foi a melhor parte do seu dia?",
  "Como você se sentiu em relação a si mesmo(a)?",
  "O que você fez para cuidar do seu coração?",
  "Qual foi o momento mais divertido do seu dia?",
  "Que habilidade você desenvolveu hoje?",
  "O que você fez para superar um medo?",
  "Como você mostrou compaixão hoje?",
  "Qual foi seu maior desafio e como lidou com ele?",
  "O que te trouxe equilíbrio hoje?",
  "Que momento do dia foi mais significativo para você?",
  "Como você pode praticar mais gratidão amanhã?",
  "O que você fez para se conectar com a natureza?",
  "Que hábito você abandonou hoje?",
  "Como você celebrou suas pequenas vitórias?",
  "O que você fez para se sentir inspirado(a)?",
  "Qual foi o seu momento mais tranquilo?",
  "Que sonho você se permitiu sonhar hoje?",
  "Como você cultivou a paciência?",
  "O que você fez para fortalecer sua mente?",
  "Qual foi o maior desafio de hoje e o que aprendeu?",
  "Que palavra você usaria para descrever seu dia?",
  "Como você cuidou da sua saúde mental hoje?",
  "Qual foi o seu momento de maior foco?",
  "Que gesto de amor próprio você teve hoje?",
  "O que você fez para se sentir conectado(a) ao mundo?",
  "Como você lidou com uma decepção hoje?",
  "Qual foi a sua maior realização interior?",
  "O que você pode fazer amanhã para se sentir mais feliz?",
  "Que sentimento você deseja cultivar?",
  "Como você expressou sua autenticidade hoje?",
  "O que você fez para fortalecer sua autoestima?",
  "Qual foi o momento mais tranquilo que você teve?",
  "Que coisa você fez para se desafiar hoje?",
  "Como você cuidou do seu descanso?",
  "O que você fez para se sentir mais confiante?",
  "Qual foi a sua maior fonte de motivação hoje?",
  "O que você pode aprender com o dia de hoje?",
  "Como você expressou gratidão hoje?",
  "Qual foi o melhor conselho que você recebeu?",
  "Que pensamento você quer carregar para amanhã?",
  "O que você fez para cuidar do seu emocional?",
  "Como você se relacionou com os outros hoje?",
  "Qual momento você gostaria de guardar na memória?",
  "Que desafio você quer superar amanhã?",
  "O que te trouxe paz hoje?",
  "Como você cuidou do seu corpo e mente?",
  "Qual foi o melhor momento do seu dia?",
  "Que gesto de carinho você recebeu?",
  "O que você fez para ajudar alguém hoje?",
  "Qual foi seu maior aprendizado pessoal hoje?",
  "O que te fez sentir grato(a) hoje?",
  "Como você demonstrou empatia hoje?",
  "Que momento trouxe alegria ao seu coração?",
  "O que você pode melhorar amanhã?",
  "Como você se sentiu em relação aos seus objetivos?",
  "Qual foi seu momento de maior criatividade?",
  "Que hábito positivo você fortaleceu hoje?",
  "O que você fez para aliviar o estresse?",
  "Qual foi o seu maior desafio e como superou?",
  "O que você fez para se sentir mais presente?",
  "Que pensamento te motivou a agir hoje?",
  "Como você cuidou do seu espírito hoje?",
  "O que você gostaria de lembrar daqui a um ano?",
  "Que coisa você fez que te orgulhou?",
  "Como você lidou com suas emoções hoje?",
  "Qual foi o momento mais tranquilo do dia?",
  "O que te fez sorrir hoje?",
  "Que atitude você pode mudar para melhorar amanhã?",
  "Como você demonstrou paciência hoje?",
  "O que você fez para cultivar o amor próprio?",
  "Qual foi seu maior momento de gratidão?",
  "Que pensamento te trouxe esperança?",
  "Como você lidou com um medo hoje?",
  "O que você fez para se sentir mais forte?",
  "Qual foi seu momento mais divertido?",
  "Que desafio você quer enfrentar amanhã?",
  "Como você expressou sua autenticidade hoje?",
  "O que você fez para relaxar e cuidar de si?",
  "Qual foi seu maior aprendizado do dia?",
  "Que sentimento você quer cultivar amanhã?",
  "Como você demonstrou generosidade?",
  "O que você fez para fortalecer suas relações?",
  "Qual foi o melhor momento de conexão?",
  "Que hábito saudável você começou ou manteve?",
  "O que você pode fazer para ser mais gentil consigo mesmo(a)?",
  "Qual foi seu momento de maior foco?",
  "O que te trouxe paz interior?",
  "Como você lidou com uma situação difícil?",
  "O que você aprendeu sobre você hoje?",
  "Que sonho você quer realizar?",
  "Como você demonstrou gratidão hoje?",
  "Qual foi o momento mais feliz do dia?",
  "O que você pode mudar para ser mais feliz?",
  "Que gesto de carinho você fez?",
  "Como você cuidou da sua saúde mental?",
  "Qual foi seu maior desafio emocional?",
  "O que você fez para se sentir mais confiante?",
  "Que pensamento você quer levar para o amanhã?",
  "Como você expressou sua criatividade?",
  "Qual foi seu momento de maior calma?",
  "Que coisa você fez que te fez sentir vivo(a)?",
  "O que você fez para cultivar a paciência?",
  "Como você lidou com o estresse hoje?",
  "Qual foi seu maior momento de alegria?",
  "Que desafio você quer superar amanhã?",
  "Como você demonstrou amor próprio?",
  "O que você fez para se sentir mais equilibrado(a)?",
  "Qual foi o melhor momento do seu dia?",
  "Que pensamento te inspirou?",
  "Como você cuidou do seu corpo?",
  "O que você gostaria de agradecer hoje?",
  "Qual foi seu momento de maior foco?",
  "Que atitude você quer mudar para amanhã?",
  "Como você demonstrou empatia?",
  "O que você fez para ajudar alguém?",
  "Qual foi seu maior aprendizado pessoal?",
  "Que sentimento você deseja cultivar?",
  "Como você lidou com suas emoções?",
  "O que você fez para se sentir mais presente?",
  "Qual foi o momento mais tranquilo do dia?",
  "Que desafio você quer enfrentar amanhã?",
  "Como você expressou gratidão?",
  "O que você fez para cuidar de si mesmo(a)?",
  "Qual foi seu maior momento de paz?",
  "Que coisa você fez que te orgulhou?",
  "Como você lidou com um medo?",
  "Qual foi seu momento mais feliz?",
  "O que você pode mudar para ser melhor?",
  "Que gesto de carinho você fez?",
  "Como você cuidou da sua saúde mental?",
  "Qual foi seu maior desafio emocional?",
  "O que você fez para se sentir mais forte?",
  "Que pensamento você quer levar para o amanhã?",
  "Como você expressou sua criatividade?",
  "Qual foi seu momento de maior calma?",
  "Que coisa você fez que te fez sentir vivo(a)?",
  "O que você fez para cultivar a paciência?",
  "Como você lidou com o estresse?",
  "Qual foi seu maior momento de alegria?",
  "Que desafio você quer superar amanhã?",
  "Como você demonstrou amor próprio?",
  "O que você fez para se sentir mais equilibrado(a)?",
  "Qual foi o melhor momento do seu dia?",
  "Que pensamento te inspirou?",
  "Como você cuidou do seu corpo?",
  "O que você gostaria de agradecer hoje?",
  "Qual foi seu momento de maior foco?",
  "Que atitude você quer mudar para amanhã?",
  "Como você demonstrou empatia?",
  "O que você fez para ajudar alguém?",
  "Qual foi seu maior aprendizado pessoal?",
  "Que sentimento você deseja cultivar?",
  "Como você lidou com suas emoções?",
  "O que você fez para se sentir mais presente?",
  "Qual foi o momento mais tranquilo do dia?",
  "Que desafio você quer enfrentar amanhã?",
  "Como você expressou gratidão?",
  "O que você fez para cuidar de si mesmo(a)?",
  "Qual foi seu maior momento de paz?",
  "Que coisa você fez que te orgulhou?",
  "Como você lidou com um medo?",
  "Qual foi seu momento mais feliz?",
  "O que você pode mudar para ser melhor?",
  "Que gesto de carinho você fez?",
  "Como você cuidou da sua saúde mental?",
  "Qual foi seu maior desafio emocional?",
  "O que você fez para se sentir mais forte?",
  "Que pensamento você quer levar para o amanhã?",
  "Como você expressou sua criatividade?",
  "Qual foi seu momento de maior calma?",
  "Que coisa você fez que te fez sentir vivo(a)?",
  "O que você fez para cultivar a paciência?",
  "Como você lidou com o estresse?",
  "Qual foi seu maior momento de alegria?",
  "Que desafio você quer superar amanhã?",
  "Como você demonstrou amor próprio?",
  "O que você fez para se sentir mais equilibrado(a)?",
  "Qual foi o melhor momento do seu dia?",
  "Que pensamento te inspirou?",
  "Como você cuidou do seu corpo?",
  "O que você gostaria de agradecer hoje?",
  "Qual foi seu momento de maior foco?",
];

// Formata data yyyy-mm-dd
function formatarData(data) {
  return data.toISOString().split('T')[0];
}

// Retorna número do dia do ano (1 a 366)
function obterDiaDoAno(data) {
  const inicioAno = new Date(data.getFullYear(), 0, 0);
  const diff = data - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  return Math.floor(diff / umDia);
}

// Variáveis globais
let dataSelecionada = new Date();
dataSelecionada.setHours(0,0,0,0);

const hoje = new Date();
hoje.setHours(0,0,0,0);

let respostas = JSON.parse(localStorage.getItem("respostas")) || {};
let dataParaDeletar = null; // Armazena a data a ser deletada temporariamente

// Elementos DOM
const btnToggleCalendario = document.getElementById('btnToggleCalendario');
const calendarioContainer = document.getElementById('calendario-container');
const mesAnterior = document.getElementById('mesAnterior');
const mesProximo = document.getElementById('mesProximo');

btnToggleCalendario.addEventListener('click', () => {
  if(calendarioContainer.classList.contains('oculto')){
    calendarioContainer.classList.remove('oculto');
    btnToggleCalendario.textContent = "Fechar Calendário";
  } else {
    calendarioContainer.classList.add('oculto');
    btnToggleCalendario.textContent = "Abrir Calendário";
  }
});

mesAnterior.addEventListener('click', () => {
  trocarMes(-1);
});

mesProximo.addEventListener('click', () => {
  trocarMes(1);
});

function atualizarPergunta() {
  const diaAno = obterDiaDoAno(dataSelecionada);
  const perguntaTexto = perguntas[(diaAno - 1) % perguntas.length];
  document.getElementById('pergunta-texto').innerText = perguntaTexto;

  const dataStr = formatarData(dataSelecionada);
  document.getElementById('resposta').value = respostas[dataStr] || "";

  marcarDiaSelecionado(dataStr);
}

function abrirModal(id) {
  document.getElementById(id).style.display = 'block';
}

function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}

function salvarResposta() {
  const dataStr = formatarData(dataSelecionada);
  const texto = document.getElementById('resposta').value.trim();

  if(texto.length > 0){
    respostas[dataStr] = texto;
  } else {
    delete respostas[dataStr];
  }
  localStorage.setItem("respostas", JSON.stringify(respostas));
  renderizarCalendario();
  abrirModal('modalSalvo');
}

function deletarResposta() {
  const dataStr = formatarData(dataSelecionada);
  if(respostas[dataStr]){
    dataParaDeletar = dataStr;
    abrirModal('modalConfirmar');
  }
}

function confirmarDelecao() {
  if(dataParaDeletar && respostas[dataParaDeletar]){
    delete respostas[dataParaDeletar];
    localStorage.setItem("respostas", JSON.stringify(respostas));
    document.getElementById('resposta').value = "";
    renderizarCalendario();
  }
  fecharModal('modalConfirmar');
  abrirModal('modalDeletado');
}

function trocarMes(incremento) {
  const novoMes = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth() + incremento, 1);
  if (novoMes > hoje) return; // Bloqueia meses futuros

  // Efeito de virar página
  const calendarioEl = document.getElementById('calendario');
  calendarioEl.classList.add('virar');

  setTimeout(() => {
    calendarioEl.classList.remove('virar');
    dataSelecionada = novoMes;
    renderizarCalendario();

    // Seleciona o primeiro dia disponível do novo mês
    const primeiroDia = new Date(novoMes.getFullYear(), novoMes.getMonth(), 1);
    if (primeiroDia > hoje) {
      dataSelecionada = hoje;
    } else {
      dataSelecionada = primeiroDia;
    }

    atualizarPergunta();
  }, 300);
}

function renderizarCalendario() {
  const calendario = document.getElementById('calendario');
  calendario.innerHTML = '';

  const ano = dataSelecionada.getFullYear();
  const mes = dataSelecionada.getMonth();

  const diasSemana = ['D','S','T','Q','Q','S','S'];
  diasSemana.forEach(dia => {
    const div = document.createElement('div');
    div.classList.add('diasSemana');
    div.textContent = dia;
    calendario.appendChild(div);
  });

  const primeiroDia = new Date(ano, mes, 1);
  const diaSemanaInicio = primeiroDia.getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  for(let i = 0; i < diaSemanaInicio; i++){
    const div = document.createElement('div');
    calendario.appendChild(div);
  }

  for(let dia = 1; dia <= ultimoDia; dia++){
    const dataAtual = new Date(ano, mes, dia);
    const dataStr = formatarData(dataAtual);
    const diaAno = obterDiaDoAno(dataAtual);

    const div = document.createElement('div');
    div.classList.add('dia');
    div.textContent = dia;

    if(dataAtual > hoje){
      div.classList.add('bloqueado');
    } else {
      if(respostas[dataStr]){
        div.classList.add('respondido');
      }
      div.addEventListener('click', () => {
        dataSelecionada = dataAtual;
        atualizarPergunta();
      });
    }

    calendario.appendChild(div);
  }

  const mesesNome = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  document.getElementById('mesAno').textContent = `${mesesNome[mes]} ${ano}`;
}

function marcarDiaSelecionado(dataStr) {
  const dias = document.querySelectorAll('#calendario .dia');
  dias.forEach(diaEl => {
    if(diaEl.textContent){
      const diaNum = parseInt(diaEl.textContent, 10);
      const dataDia = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), diaNum);
      const ds = formatarData(dataDia);
      if(ds === dataStr){
        diaEl.classList.add('selecionado');
      } else {
        diaEl.classList.remove('selecionado');
      }
    }
  });
}

function init() {
  dataSelecionada = new Date();
  dataSelecionada.setHours(0,0,0,0);

  renderizarCalendario();
  atualizarPergunta();
}

init();

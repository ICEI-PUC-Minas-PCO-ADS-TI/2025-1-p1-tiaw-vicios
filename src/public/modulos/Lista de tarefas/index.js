const campoEntrada = document.getElementById("campoEntrada");
const formTarefas = document.getElementById("formTarefas");
const listaTarefas = document.getElementById("listaTarefas");
const progressBar = document.getElementById("progressBar");

// Tarefas iniciais fixas
const tarefasIniciais = [
  { nome: "Vídeos", timestamp: Date.now() },
  { nome: "Atividades", timestamp: Date.now() },
  { nome: "Online mais de 10 m", timestamp: Date.now() }
];

function atualizarProgresso() {
  const tarefas = listaTarefas.querySelectorAll("li");
  const concluidas = listaTarefas.querySelectorAll("span.concluida").length;
  const percentual = tarefas.length > 0 ? (concluidas / tarefas.length) * 100 : 0;
  progressBar.style.width = `${percentual}%`;
}

function criarTarefa(nome, fixa = false, dataCriacao = Date.now()) {
  const itemTarefa = document.createElement("li");
  const span = document.createElement("span");
  const btnExcluir = document.createElement("button");

  span.innerText = nome;
  span.onclick = (evento) => {
    evento.target.classList.toggle("concluida");
    atualizarProgresso();
  };

  btnExcluir.innerHTML = "🗑️";
  btnExcluir.setAttribute("aria-label", "Excluir tarefa");

  if (fixa) {
    btnExcluir.disabled = true;
    btnExcluir.title = "Disponível para excluir após 24 horas";
    btnExcluir.style.opacity = "0.4";

    // Verifica se 24h passaram
    const agora = Date.now();
    const tempoPassado = agora - dataCriacao;
    const umDia = 24 * 60 * 60 * 1000;

    if (tempoPassado >= umDia) {
      btnExcluir.disabled = false;
      btnExcluir.style.opacity = "1";
      btnExcluir.title = "Excluir";
    } else {
      // Habilita exclusão após 24h
      setTimeout(() => {
        btnExcluir.disabled = false;
        btnExcluir.style.opacity = "1";
        btnExcluir.title = "Excluir";
      }, umDia - tempoPassado);
    }
  }

  btnExcluir.onclick = () => {
    if (!btnExcluir.disabled) {
      listaTarefas.removeChild(itemTarefa);
      atualizarProgresso();
    }
  };

  itemTarefa.appendChild(span);
  itemTarefa.appendChild(btnExcluir);
  listaTarefas.appendChild(itemTarefa);
}

function adicionarNovaTarefa() {
  const nomeTarefa = campoEntrada.value.trim();

  if (nomeTarefa === "") {
    campoEntrada.classList.add("input-erro");
    setTimeout(() => campoEntrada.classList.remove("input-erro"), 1500);
    return;
  }

  criarTarefa(nomeTarefa);
  campoEntrada.value = "";
  atualizarProgresso();
}

formTarefas.addEventListener("submit", (evento) => {
  evento.preventDefault();
  adicionarNovaTarefa();
});

// Adiciona as tarefas fixas na primeira carga
tarefasIniciais.forEach(tarefa => {
  criarTarefa(tarefa.nome, true, tarefa.timestamp);
});
atualizarProgresso();

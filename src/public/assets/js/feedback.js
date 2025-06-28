const API_URL = "https://jsonvicios.vercel.app/feedback";


document.getElementById('feedback-link').onclick = (e) => {
  e.preventDefault();
  sessionStorage.removeItem("editandoId"); 
  limparCampos(); 
  document.getElementById('modal-feedback').classList.remove('oculto');
};

document.getElementById('fechar-feedback').onclick = () => {
  document.getElementById('modal-feedback').classList.add('oculto');
};

document.getElementById('abrir-visualizacao').onclick = () => {
  document.getElementById('modal-visualizacao').classList.remove('oculto');
  carregarFeedbacks();
};

document.getElementById('fechar-visualizacao').onclick = () => {
  document.getElementById('modal-visualizacao').classList.add('oculto');
};

document.getElementById('enviar').onclick = async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const data = new Date().toLocaleDateString('pt-BR');
  const comentario = document.getElementById('comentario').value;

  if (nome && email && data && comentario) {
    const idEditando = sessionStorage.getItem("editandoId");

    const novoFeedback = {
      nome,
      email,
      data,
      comentario
    };

    if (idEditando) {
  await fetch(`${API_URL}/${idEditando}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoFeedback),
  });
  sessionStorage.removeItem("editandoId");
} else {
  
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoFeedback),
  });
}

    alert('Feedback salvo!');
    document.getElementById('modal-feedback').classList.add('oculto');
    limparCampos();
    carregarFeedbacks();
  } else {
    alert('Preencha todos os campos!');
  }
};
document.getElementById('feedback-link').onclick = (e) => {
  e.preventDefault();
  sessionStorage.removeItem("editandoId");
  limparCampos();
  document.getElementById('voltar-visualizacao').classList.add('oculto'); 
  document.getElementById('modal-feedback').classList.remove('oculto');
};
document.getElementById('voltar-visualizacao').onclick = () => {
  document.getElementById('modal-feedback').classList.add('oculto');
  document.getElementById('modal-visualizacao').classList.remove('oculto');
  sessionStorage.removeItem("editandoId");
  limparCampos();
  document.getElementById('voltar-visualizacao').classList.add('oculto');
};

async function carregarFeedbacks() {
      try {

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao carregar feedbacks');
  const feedbacks = await res.json();

  const container = document.getElementById('lista-feedbacks');
  container.innerHTML = '';

  feedbacks.forEach((f) => {
    const div = document.createElement('div');

const titulo = document.createElement('h4');
titulo.textContent = `${f.nome} - ${f.data}`;

const texto = document.createElement('p');
texto.textContent = f.comentario;

const btnEditar = document.createElement('button');
btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
btnEditar.addEventListener('click', () => editarFeedback(f.id));

const btnExcluir = document.createElement('button');
btnExcluir.textContent = '🗑️';
btnExcluir.addEventListener('click', () => excluirFeedback(f.id));

div.appendChild(titulo);
div.appendChild(texto);
div.appendChild(btnEditar);
div.appendChild(btnExcluir);
div.appendChild(document.createElement('hr'));

container.appendChild(div);

  });
}catch (error) {
    alert("Erro ao buscar feedbacks. Verifique se o servidor está ativo.");
    console.error(error);
  }
}



async function excluirFeedback(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  carregarFeedbacks();
}

async function editarFeedback(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    alert("Erro ao buscar feedback para edição.");
    return;
  }

  const f = await res.json();

  document.getElementById('nome').value = f.nome;
  document.getElementById('email').value = f.email;
  document.getElementById('comentario').value = f.comentario;
  document.getElementById('modal-visualizacao').classList.add('oculto');
  document.getElementById('voltar-visualizacao').classList.remove('oculto');

  sessionStorage.setItem("editandoId", id); 
  document.getElementById('modal-feedback').classList.remove('oculto');
}
function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('comentario').value = '';
}
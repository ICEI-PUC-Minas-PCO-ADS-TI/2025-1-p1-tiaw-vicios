document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const messageDiv = document.getElementById('login-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();

    fetch('http://localhost:3000/usuarios')
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.login === login && u.senha === senha);
        if (user) {
          messageDiv.textContent = '';
          alert(`Bem-vindo, ${user.nome}!`);
          // Redirecionar para a página principal ou outra página
          window.location.href = 'index.html';
        } else {
          messageDiv.textContent = 'Usuário ou senha inválidos.';
        }
      })
      .catch(error => {
        messageDiv.textContent = 'Erro ao conectar ao servidor.';
        console.error('Erro:', error);
      });
  });
});

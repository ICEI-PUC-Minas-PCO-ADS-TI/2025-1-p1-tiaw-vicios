document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro-form');
  const messageDiv = document.getElementById('cadastro-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !email || !login || !senha) {
      messageDiv.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    // Verificar se o usuário já existe
    fetch('http://localhost:3000/usuarios')
      .then(response => response.json())
      .then(users => {
        const userExists = users.some(u => u.login === login || u.email === email);
        if (userExists) {
          messageDiv.textContent = 'Usuário ou email já cadastrado.';
          return;
        }

        // Criar novo usuário
        const newUser = {
          nome,
          email,
          login,
          senha
        };

        fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then(response => {
            if (response.ok) {
              messageDiv.style.color = 'green';
              messageDiv.textContent = 'Cadastro realizado com sucesso! Você pode fazer login agora.';
              form.reset();
            } else {
              throw new Error('Erro ao cadastrar usuário.');
            }
          })
          .catch(error => {
            messageDiv.style.color = 'red';
            messageDiv.textContent = error.message;
          });
      })
      .catch(error => {
        messageDiv.textContent = 'Erro ao conectar ao servidor.';
        console.error('Erro:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Registration form handling
  const registerForm = document.getElementById('register-form');
  const registerMessage = document.getElementById('register-message');

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const senha = document.getElementById('senha-register').value.trim();

    if (!nome || !email || !senha) {
      registerMessage.style.color = 'red';
      registerMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    // Check if user already exists
    fetch('https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios')
      .then(response => response.json())
      .then(users => {
        const userExists = users.some(u => u.login === email || u.email === email);
        if (userExists) {
          registerMessage.style.color = 'red';
          registerMessage.textContent = 'Usuário ou email já cadastrado.';
          return;
        }

        // Create new user
        const newUser = {
          nome: nome,
          login: email,
          email: email,
          senha: senha
        };

        fetch('https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then(response => {
            if (response.ok) {
              alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
              registerForm.reset();
              window.location.href = 'home.html';
            } else {
              throw new Error('Erro ao cadastrar usuário.');
            }
          })
          .catch(error => {
            registerMessage.style.color = 'red';
            registerMessage.textContent = error.message;
          });
      })
      .catch(error => {
        registerMessage.style.color = 'red';
        registerMessage.textContent = 'Erro ao conectar ao servidor.';
        console.error('Erro:', error);
      });
  });

  // Login form handling
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value.trim();
    const senha = document.getElementById('senha-login').value.trim();

    if (!email || !senha) {
      loginMessage.style.color = 'red';
      loginMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    // Check credentials
    fetch('https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios')
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => (u.login === email || u.email === email) && u.senha === senha);
        if (user) {
          alert('Login realizado com sucesso! Redirecionando...');
          loginMessage.style.color = 'green';
          loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
          // Redirect to home or another page after successful login, including user id in URL
          setTimeout(() => {
            window.location.href = `home.html?userId=${user.id}`;
          }, 1500);
        } else {
          loginMessage.style.color = 'red';
          loginMessage.textContent = 'Email ou senha incorretos.';
        }
      })
      .catch(error => {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Erro ao conectar ao servidor.';
        console.error('Erro:', error);
      });
  });
});

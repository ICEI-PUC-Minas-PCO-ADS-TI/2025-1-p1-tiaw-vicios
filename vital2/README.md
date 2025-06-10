# Sistema de Feedback – Projeto Interdisciplinar

Este projeto tem como objetivo permitir que usuários registrem e visualizem feedbacks sobre o conteúdo de um site. Ele foi desenvolvido como parte do trabalho interdisciplinar da disciplina de Aplicações Web. O meu artefato é Cadastro de Informações(CRUD)

---

## 🎯 Funcionalidades

- ✅ Cadastro de feedback com **nome, e-mail, comentário** e **data automática**
- ✅ Visualização de todos os feedbacks enviados
- ✅ Edição de feedbacks já enviados
- ✅ Exclusão de feedbacks
- ✅ Modal de feedback interativo (sem mudar de página)
- ✅ Armazenamento de dados com **JSON Server**
- ✅ Estilização com HTML e CSS personalizado
- ✅ Interface responsiva e acessível

---

## 🗂 Estrutura de Pastas
scrum-2/
├── db/
│ └── db.json # Arquivo com os dados simulando o banco
│
├── public/
│ ├── css/
│ │ └── estilo.css # Estilização do site
│ ├── html/
│ │ └── feedback.html # Página principal com o sistema de feedback
│ ├── imgs/
│ │ └── texto.png # Imagem usada no botão de feedback
│ └── script/
│ └── apps.js # Lógica do sistema (JavaScript)
│
└── README.md # Documentação do projeto

## 🗂 Estrutura de Dados (JSON)

Exemplo de estrutura salva em `db.json`:

```json
{
  "feedback": [
    {
      "id": 1,
      "nome": "João Pedro",
      "email": "joao@email.com",
      "data": "28/05/2025",
      "comentario": "Gostei muito do conteúdo do site!"
    }
  ]
}
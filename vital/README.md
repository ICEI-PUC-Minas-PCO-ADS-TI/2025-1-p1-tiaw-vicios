# 📌 Portal de Conscientização sobre Vícios

Projeto web interativo para educação sobre dependências químicas e comportamentais, com cards informativos e sistema de busca.

## 🛠️ Funcionalidades
- **Filtro dinâmico**: Busca instantânea por título dos cards.
- **Página de detalhes**: Exibe conteúdo completo ao clicar em um card.
- **Design responsivo**: Adaptável a dispositivos móveis e desktop.

## 📂 Estrutura de Arquivos
SCRUM-1/
├── .vscode/ # Configurações do VSCode (opcional)
├── app.js # Lógica principal (dados + eventos)
├── detailnes.html # Página de detalhes (HTML)
├── jquery-3.7.1.slim.min.js # Biblioteca jQuery
├── pesquisa.html # Página principal (HTML)
├── README.md # Este arquivo
└── style.css # Estilos CSS

## 💾 Dados
- **Fonte**: Armazenados localmente em `app.js` (objeto `pesquisa`).
- **Estrutura**:
  ```javascript
   {
    id: Number,          // Identificador único
    titulo: String,      // Título do card
    imagem: String,      // URL da imagem
    descricao: String,   // Resumo do conteúdo
    detalhes: String     // Texto completo
  }
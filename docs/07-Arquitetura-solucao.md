# Arquitetura da Solução

## Visão Geral

A arquitetura da solução foi planejada para fornecer uma plataforma simples, leve e funcional para apoio a pessoas com vícios. A estrutura utiliza um frontend moderno integrado com um backend simulado por meio do JSON Server, que atua como uma API REST baseada em arquivos `.json`.

## Componentes Principais

- **Frontend (Cliente):**
  - Desenvolvido com HTML, CSS e JavaScript.
  - Pode utilizar bibliotecas/frameworks como React.js ou apenas JavaScript puro.
  - Responsável por exibir a interface de forma clara e acessível, adaptada para usuários em dispositivos móveis e desktops.

- **Backend (Simulado - JSON Server):**
  - Utiliza a ferramenta JSON Server para simular uma API REST.
  - As informações são armazenadas em arquivos `.json` locais (por exemplo: `db.json`).
  - Permite operações CRUD (Create, Read, Update, Delete) por meio de endpoints REST simulados.
  - Ideal para projetos acadêmicos ou protótipos rápidos.

- **Arquivos JSON:**
  - Estrutura de dados simples, armazenada localmente.
  - Usado para guardar informações de usuários, mensagens, conteúdos de apoio, etc.
  - Pode ser facilmente editado e versionado com o projeto.

## Diagrama da Arquitetura

```mermaid
graph TD
  A[Usuário] --> B[Frontend - HTML/CSS/JS]
  B --> C[JSON Server - API REST fake]
  C --> D[Arquivo db.json]

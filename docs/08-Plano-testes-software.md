# **Plano de Testes de Software**

## 1. Objetivo dos Testes

Verificar se as funcionalidades do sistema, voltadas ao apoio de pessoas com vícios, funcionam corretamente. O foco é garantir **usabilidade**, **confiabilidade** e **segurança**, mesmo utilizando dados armazenados em arquivos JSON.


## 2. Escopo dos Testes

Funcionalidades que serão testadas:

* Cadastro e login de usuários (com persistência em JSON)
* Acesso a conteúdos de apoio (textos, vídeos, links)
* Área administrativa para gerenciamento de conteúdo


## 3. Tipos de Testes

* **Testes Funcionais**: Garantir que cada funcionalidade descrita nos requisitos opere como esperado.
* **Testes de Interface**: Avaliar a experiência do usuário, navegação e acessibilidade.
* **Testes de Integração**: Verificar a comunicação entre a interface e os dados armazenados no arquivo JSON.
* **Testes de Segurança**: Proteger dados sensíveis (ex: senhas), mesmo que armazenados localmente.


## 4. Ambiente de Testes

* **Navegadores**: Google Chrome, Mozilla Firefox
* **Dispositivos**: Desktop e smartphones
* **Ferramentas Utilizadas**:

  * **Postman** – Para testar requisições simuladas ao JSON
  * **Selenium** – Para automação de testes de interface
  * **OWASP ZAP** – Para verificar falhas de segurança
  * **VS Code + Live Server** – Execução e simulação local do sistema



## 5. Casos de Teste (Exemplos)

| Caso de Teste               | Entrada                           | Saída Esperada                         | Resultado |
| --------------------------- | --------------------------------- | -------------------------------------- | --------- |
| Cadastro de usuário         | Nome, email e senha válidos       | Conta criada e salva no JSON           | Aprovado  |
| Cadastro com email repetido | Email já existente no JSON        | Mensagem de erro "Email já cadastrado" | Aprovado  |
| Login com dados corretos    | Email e senha existentes no JSON  | Usuário autenticado e redirecionado    | Aprovado  |
| Login com dados incorretos  | Email inexistente ou senha errada | Mensagem de erro                       | Aprovado  |
| Acesso a material de apoio  | Clique em link de conteúdo        | Conteúdo carregado corretamente        | Aprovado  |
| Adição de conteúdo (admin)  | Formulário de novo conteúdo       | JSON atualizado com novo item          | Aprovado  |



## 6. Critérios de Aceitação

* Todos os testes devem ser concluídos com sucesso
* Nenhuma falha crítica de execução ou segurança
* Interface deve ser responsiva, intuitiva e acessível (atender, por exemplo, contraste e tamanho de fonte adequados)



## 7. Cronograma

| Atividade               | Início | Término |
| ----------------------- | ------ | ------- |
| Planejamento dos Testes | 11/06  | 15/06   |
| Execução dos Testes     | 11/06  | 15/06   |
| Correção de Problemas   | 11/06  | 15/06   |



## 8. Riscos

* Armazenamento em JSON pode limitar a escalabilidade e segurança dos dados
* Cobertura de testes limitada pode deixar falhas escondidas
* Ausência de testes de acessibilidade pode impactar negativamente usuários com deficiência visual ou motora


## 9. Responsáveis

* **Vinicius Tales Silva** – Testes e Documentação
* **Equipe de Desenvolvimento** – Lotus (Ajuda no Controle no Combate ao Vício)

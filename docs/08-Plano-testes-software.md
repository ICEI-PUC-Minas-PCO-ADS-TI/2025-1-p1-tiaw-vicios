# Plano de Testes de Software

 1. Objetivo dos Testes
Verificar se as funcionalidades do sistema que visam oferecer apoio a pessoas com vícios estão funcionando corretamente, garantindo usabilidade, confiabilidade e segurança.

 2. Escopo dos Testes
Funcionalidades testadas:
- Cadastro/login de usuários  
- Acesso a conteúdos de apoio (textos, vídeos, links)    
- Área administrativa para controle de conteúdo

 3. Tipos de Testes
- Testes Funcionais: Validação de cada funcionalidade descrita nos requisitos.  
- Testes de Interface: Avaliação da usabilidade e acessibilidade.  
- Testes de Integração: Verificação da comunicação entre frontend e backend.  
- Testes de Segurança: Garantir que dados sensíveis dos usuários estejam protegidos.

 4. Ambiente de Testes
- Navegadores: Google Chrome, Mozilla Firefox  
- Dispositivos: Desktop e smartphones   
- Ferramentas: Postman (API), Selenium (automação), OWASP ZAP (segurança)

 5. Casos de Teste (Exemplos)

| Caso de Teste               | Entrada                     | Saída Esperada              | Resultado |
|----------------------------|-----------------------------|-----------------------------|-----------|
| Cadastro de usuário        | Nome, email, senha válida   | Conta criada com sucesso    | Aprovado  |
| Login com dados incorretos | Email incorreto, senha      | Mensagem de erro            | Aprovado  |
| Acesso a material de apoio | Clique em link de conteúdo  | Conteúdo carregado corretamente | Aprovado  |

6. Critérios de Aceitação
- Todos os testes devem passar com sucesso  
- Não pode haver falhas críticas ou de segurança  
- Interface deve ser acessível e intuitiva

 7. Cronograma

| Atividade                  | Início  | Término |
|---------------------------|---------|---------|
| Planejamento de testes    | 11/06   | 15/06   |
| Execução dos testes       | 11/06   | 15/06   |
| Análise e correções       | 11/06   | 15/06   |

 8. Riscos
- Baixa cobertura de testes pode ocultar falhas em áreas críticas  
- Falta de testes de acessibilidade pode prejudicar o público-alvo

 9. Responsáveis
- Vinicius tales silva,   
- Equipe de Desenvolvimento – Lotus ( Ajuda no Controle no Combate ao Vício )


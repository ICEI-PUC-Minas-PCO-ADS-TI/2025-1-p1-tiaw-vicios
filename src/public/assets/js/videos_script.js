document.addEventListener("DOMContentLoaded", async function () {
    const markVideoButtons = document.querySelectorAll(".mark-video-btn");

    // Função para verificar e desabilitar botões ao carregar a página
    async function checkAndDisableButtons() {
        const currentUserId = localStorage.getItem("userId");
        if (!currentUserId) {
            console.warn("videos_script.js: ID do usuário não encontrado no localStorage ao carregar a página.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${currentUserId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userData = await response.json();

            markVideoButtons.forEach(button => {
                const moduleType = button.dataset.moduleType;
                const videoId = button.dataset.videoId;

                if (userData.progresso && userData.progresso[moduleType] && userData.progresso[moduleType].videosConcluidosIds) {
                    if (userData.progresso[moduleType].videosConcluidosIds.includes(videoId)) {
                        button.textContent = "Concluído!";
                        button.disabled = true;
                    }
                }
            });
        } catch (error) {
            console.error("videos_script.js: Erro ao verificar vídeos concluídos na carga da página:", error);
        }
    }

    // Chamar a função ao carregar a página
    checkAndDisableButtons();

    markVideoButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const moduleType = event.target.dataset.moduleType; // 'alcool' ou 'tabaco'
            const videoId = event.target.dataset.videoId;

            // Obter o userId do localStorage
            const currentUserId = localStorage.getItem("userId");

            if (!currentUserId) {
                console.error("videos_script.js: ID do usuário não encontrado no localStorage.");
                alert("Erro: ID do usuário não encontrado. Por favor, faça login novamente.");
                return;
            }

            try {
                // 1. Buscar os dados atuais do usuário
                const response = await fetch(`http://localhost:3000/usuarios/${currentUserId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const userData = await response.json();

                // 2. Verificar se o vídeo já foi marcado como concluído
                if (userData.progresso && userData.progresso[moduleType]) {
                    if (userData.progresso[moduleType].videosConcluidosIds.includes(videoId)) {
                        alert(`Este vídeo já foi marcado como concluído para ${moduleType}.`);
                        event.target.textContent = "Concluído!";
                        event.target.disabled = true;
                        return; // Sair da função se já foi concluído
                    }

                    // 3. Incrementar videoaulasAssistidas e adicionar o ID do vídeo
                    userData.progresso[moduleType].videoaulasAssistidas++;
                    userData.progresso[moduleType].videosConcluidosIds.push(videoId);

                } else {
                    console.error(`videos_script.js: Estrutura de progresso para ${moduleType} não encontrada.`);
                    alert("Erro: Estrutura de progresso incompleta para o módulo.");
                    return;
                }

                // 4. Enviar a atualização para o db.json
                const updateResponse = await fetch(`http://localhost:3000/usuarios/${currentUserId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ progresso: userData.progresso })
                });

                if (!updateResponse.ok) {
                    throw new Error(`HTTP error! status: ${updateResponse.status}`);
                }

                alert(`Vídeo marcado como concluído para ${moduleType}!`);
                event.target.textContent = "Concluído!";
                event.target.disabled = true;

            } catch (error) {
                console.error("videos_script.js: Erro ao marcar vídeo como concluído:", error);
                alert("Ocorreu um erro ao marcar o vídeo como concluído. Tente novamente.");
            }
        });
    });
});



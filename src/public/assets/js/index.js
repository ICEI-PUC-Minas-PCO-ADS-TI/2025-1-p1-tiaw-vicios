

function calcularProgresso(dados) {
    // Garante que os denominadores não sejam zero para evitar Infinity ou NaN
    const quizProgress = dados.totalQuizzes > 0 ? (dados.quizzesConcluidos / dados.totalQuizzes) : 0;
    const taskProgress = dados.totalTarefas > 0 ? (dados.tarefasConcluidas / dados.totalTarefas) : 0;
    const videoProgress = dados.totalVideoaulas > 0 ? (dados.videoaulasAssistidas / dados.totalVideoaulas) : 0;

    // Calcula a média dos progressos. Divide pelo número de categorias com total > 0.
    let divisor = 0;
    if (dados.totalQuizzes > 0) divisor++;
    if (dados.totalTarefas > 0) divisor++;
    if (dados.totalVideoaulas > 0) divisor++;

    const progresso = divisor > 0 ? (quizProgress + taskProgress + videoProgress) / divisor : 0;

    return Math.round(progresso * 100);
}

function atualizarBarra(id, percentual) {
    const barra = document.getElementById(id);
    if (barra) {
        barra.style.width = percentual + "%";
        barra.textContent = percentual + "%";
    }
}

function criarDoughnut(ctxId, dados, titulo) {
    const ctx = document.getElementById(ctxId);
    if (ctx) {
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Quizzes", "Tarefas", "Videoaulas"],
                datasets: [{
                    data: [
                        dados.totalQuizzes > 0 ? dados.quizzesConcluidos / dados.totalQuizzes * 100 : 0,
                        dados.tarefasConcluidas > 0 ? dados.tarefasConcluidas / dados.totalTarefas * 100 : 0,
                        dados.totalVideoaulas > 0 ? dados.videoaulasAssistidas / dados.totalVideoaulas * 100 : 0
                    ],
                    backgroundColor: ["#673AB7 ", "#9575CD", "#2A3D66", "#E5EDFF"],
                    borderWidth: 2,
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: titulo,
                        color: "#FFFFFF" // Cor do título
                    },
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#FFFFFF" // Cor da legenda
                        }
                    },
                    tooltip: {
                        bodyColor: "#FFFFFF", // Cor do texto dos valores
                        titleColor: "#FFFFFF", // Cor do título do tooltip
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.parsed || 0;
                                return `${label}: ${value.toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Abrir modal
document.getElementById("openModalAlcoolBtn").onclick = function () {
    document.getElementById("modalAlcool").style.display = "flex";
};
document.getElementById("openModalTabacoBtn").onclick = function () {
    document.getElementById("modalTabaco").style.display = "flex";
};

// Fechar modal (reutilizável)
function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

function criarGraficoCircular(id, concluido, total) {
    const ctx = document.getElementById(id);
    if (ctx) {
        new Chart(ctx.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ["Concluído", "Faltando"],
                datasets: [{
                    data: [concluido, total - concluido],
                    backgroundColor: ["#673AB7", "#D9D9D9"],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                cutout: "70%",
                plugins: {
                    title: {
                        color: "#FFFFFF" // Cor do título
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: "#FFFFFF" // Texto da legenda
                        }
                    },
                    tooltip: {
                        bodyColor: "#FFFFFF", // Texto do tooltip
                        titleColor: "#FFD700" // Título do tooltip
                    }
                }
            }
        });
    }
}

// Função para buscar dados do usuário
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return null;
    }
}

// Função para renderizar os gráficos e barras de progresso
async function renderUserProgress(userId) {
    const userData = await fetchUserData(userId);

    if (userData && userData.progresso) {
        const { alcool, tabaco } = userData.progresso;

        // Álcool
        const progressoAlcool = calcularProgresso(alcool);
        atualizarBarra("barra-alcool", progressoAlcool);
        criarDoughnut("graficoAlcool", alcool, "Álcool");
        criarGraficoCircular("alcoolQuizChart", alcool.quizzesConcluidos, alcool.totalQuizzes);
        criarGraficoCircular("alcoolTarefaChart", alcool.tarefasConcluidas, alcool.totalTarefas);
        criarGraficoCircular("alcoolVideoChart", alcool.videoaulasAssistidas, alcool.totalVideoaulas);

        // Tabaco
        const progressoTabaco = calcularProgresso(tabaco);
        atualizarBarra("barra-tabaco", progressoTabaco);
        criarDoughnut("graficoTabaco", tabaco, "Tabaco");
        criarGraficoCircular("tabacoQuizChart", tabaco.quizzesConcluidos, tabaco.totalQuizzes);
        criarGraficoCircular("tabacoTarefaChart", tabaco.tarefasConcluidas, tabaco.totalTarefas);
        criarGraficoCircular("tabacoVideoChart", tabaco.videoaulasAssistidas, tabaco.totalVideoaulas);
    } else {
        console.warn("Dados de progresso do usuário não encontrados ou incompletos.");
        // Opcional: Adicionar lógica para exibir uma mensagem de erro ou dados padrão
    }
}

// Chamar a função de renderização quando a página carregar
window.onload = () => {
    // 1. Tenta obter o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentUserId = urlParams.get("userId");

    // 2. Se não estiver na URL, tenta obter do localStorage
    if (!currentUserId) {
        currentUserId = localStorage.getItem("userId");
    }

    if (currentUserId) {
        renderUserProgress(currentUserId);
    } else {
        console.error("ID do usuário não encontrado na URL nem no localStorage. Certifique-se de que o ID do usuário está sendo passado ou salvo após o login.");
        // Opcional: Redirecionar para a página de login ou exibir uma mensagem ao usuário
    }
};

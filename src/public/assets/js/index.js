document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.getElementById('mobile-search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');

    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (mobileSearch.style.display === 'none' || mobileSearch.style.display === '') {
                mobileSearch.style.display = 'block';
                mobileSearch.querySelector('input').focus();
            } else {
                mobileSearch.style.display = 'none';
            }
        });
    }
});



// JSON simulado do backend





function calcularProgresso(dados) {
    const progresso = (
        
        (dados.quizzesConcluidos / dados.totalQuizzes) +
        (dados.tarefasConcluidas / dados.totalTarefas) +
        (dados.videoaulasAssistidas / dados.totalVideoaulas)
    ) / 4;

    return Math.round(progresso * 100);
}

function atualizarBarra(id, percentual) {
    const barra = document.getElementById(id);
    barra.style.width = percentual + "%";
    barra.textContent = percentual + "%";
}

function criarDoughnut(ctxId, dados, titulo) {
    const ctx = document.getElementById(ctxId);
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [ 'Quizzes', 'Tarefas', 'Videoaulas'],
            datasets: [{
                data: [
                    
                    dados.quizzesConcluidos / dados.totalQuizzes * 100,
                    dados.tarefasConcluidas / dados.totalTarefas * 100,
                    dados.videoaulasAssistidas / dados.totalVideoaulas * 100
                ],
                backgroundColor: ['#673AB7 ', '#9575CD', '#2A3D66', '#E5EDFF'],
                borderWidth: 2,
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: titulo,
                    color: '#FFFFFF' // Cor do título
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFFFFF' // Cor da legenda
                    }
                },
                tooltip: {
                    bodyColor: '#FFFFFF',   // Cor do texto dos valores
                    titleColor: '#FFFFFF',  // Cor do título do tooltip
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

// Álcool
const progressoAlcool = calcularProgresso(dadosUsuario.alcool);
atualizarBarra("barra-alcool", progressoAlcool);
criarDoughnut("graficoAlcool", dadosUsuario.alcool, "Álcool");

// Tabaco
const progressoTabaco = calcularProgresso(dadosUsuario.tabaco);
atualizarBarra("barra-tabaco", progressoTabaco);
criarDoughnut("graficoTabaco", dadosUsuario.tabaco, "Tabaco");













// Abrir modal
document.getElementById('openModalAlcoolBtn').onclick = function () {
    document.getElementById('modalAlcool').style.display = 'flex';
};
document.getElementById('openModalTabacoBtn').onclick = function () {
    document.getElementById('modalTabaco').style.display = 'flex';
};

// Fechar modal (reutilizável)
function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}


function criarGraficoCircular(id, concluido, total) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Concluído', 'Faltando'],
            datasets: [{
                data: [concluido, total - concluido],
                backgroundColor: ['#673AB7', '#D9D9D9'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                title: {
                    color: '#FFFFFF' // Cor do título
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#FFFFFF' // Texto da legenda
                    }
                },
                tooltip: {
                    bodyColor: '#FFFFFF',  // Texto do tooltip
                    titleColor: '#FFD700'  // Título do tooltip
                }
            }
        }
    });
}

// Criar todos os gráficos com os dados simulados
window.onload = () => {
    criarGraficoCircular('alcoolQuizChart', dadosUsuario.alcool.quizzesConcluidos, dadosUsuario.alcool.totalQuizzes);
    criarGraficoCircular('alcoolTarefaChart', dadosUsuario.alcool.tarefasConcluidas, dadosUsuario.alcool.totalTarefas);
    criarGraficoCircular('alcoolVideoChart', dadosUsuario.alcool.videoaulasAssistidas, dadosUsuario.alcool.totalVideoaulas);

    
    criarGraficoCircular('tabacoQuizChart', dadosUsuario.tabaco.quizzesConcluidos, dadosUsuario.tabaco.totalQuizzes);
    criarGraficoCircular('tabacoTarefaChart', dadosUsuario.tabaco.tarefasConcluidas, dadosUsuario.tabaco.totalTarefas);
    criarGraficoCircular('tabacoVideoChart', dadosUsuario.tabaco.videoaulasAssistidas, dadosUsuario.tabaco.totalVideoaulas);
}
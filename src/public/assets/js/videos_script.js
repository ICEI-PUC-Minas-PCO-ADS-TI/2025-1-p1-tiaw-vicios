const markVideoButtons = document.querySelectorAll(".mark-video-btn");
const moduleType = event.target.dataset.moduleType; // 'alcool' ou 'tabaco'
const videoId = event.target.dataset.videoId;
const response = await fetch(`http://localhost:3000/usuarios/${currentUserId}` );
const userData = await response.json();
userData.progresso[moduleType].videoaulasAssistidas++;
const updateResponse = await fetch(`http://localhost:3000/usuarios/${currentUserId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progresso: userData.progresso } )
});

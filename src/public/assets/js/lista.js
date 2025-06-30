document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("campoEntrada");
    const addTaskBtn = document.querySelector(".add-btn");
    const taskList = document.getElementById("listaTarefas");
    const taskTypeSelect = document.getElementById("taskType");
    const formTarefas = document.getElementById("formTarefas");

    // Load tasks from Local Storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text} (${task.type === 'alcool' ? 'Álcool' : 'Tabaco'})</span>
                <div>
                    <button class="btn btn-success btn-sm me-2" onclick="toggleComplete(${index})">
                        ${task.completed ? 'Desmarcar' : 'Concluir'}
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">
                        Excluir
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to get current user ID
    function getCurrentUserId() {
        const urlParams = new URLSearchParams(window.location.search);
        let currentUserId = urlParams.get("userId");
        if (!currentUserId) {
            currentUserId = localStorage.getItem("userId");
        }
        return currentUserId;
    }

    // Function to update total tasks in db.json
    async function updateTotalTasks(userId, moduleType) {
        if (!userId || !moduleType) return;

        try {
            const response = await fetch(`https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios/${userId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const userData = await response.json();

            if (!userData.progresso) userData.progresso = {};
            if (!userData.progresso[moduleType]) userData.progresso[moduleType] = {};
            if (typeof userData.progresso[moduleType].totalTarefas === 'undefined') {
                userData.progresso[moduleType].totalTarefas = 0;
            }
            userData.progresso[moduleType].totalTarefas++;

            await fetch(`http://localhost:3000/usuarios/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progresso: userData.progresso })
            });
            console.log(`Total de tarefas de ${moduleType} atualizado para ${userData.progresso[moduleType].totalTarefas}`);
        } catch (error) {
            console.error("Erro ao atualizar total de tarefas:", error);
        }
    }

    // Function to update completed tasks in db.json
    async function updateCompletedTasks(userId, moduleType, increment) {
        if (!userId || !moduleType) return;

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const userData = await response.json();

            if (!userData.progresso) userData.progresso = {};
            if (!userData.progresso[moduleType]) userData.progresso[moduleType] = {};
            if (typeof userData.progresso[moduleType].tarefasConcluidas === 'undefined') {
                userData.progresso[moduleType].tarefasConcluidas = 0;
            }

            if (increment) {
                userData.progresso[moduleType].tarefasConcluidas++;
            } else {
                userData.progresso[moduleType].tarefasConcluidas--;
            }

            await fetch(`https://089e5876-c1ff-4d8a-9e39-0ae3f90d3ca3-00-3c7qqgjtneu9c.riker.replit.dev/usuarios/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progresso: userData.progresso })
            });
            console.log(`Tarefas concluídas de ${moduleType} atualizadas para ${userData.progresso[moduleType].tarefasConcluidas}`);
        } catch (error) {
            console.error("Erro ao atualizar tarefas concluídas:", error);
        }
    }

    // Function to add a new task
    if (formTarefas) {
        formTarefas.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent default form submission
            const taskText = taskInput.value.trim();
            const taskType = taskTypeSelect.value; // Get selected type
            const currentUserId = getCurrentUserId();

            if (taskText !== "") {
                tasks.push({ text: taskText, completed: false, type: taskType });
                taskInput.value = "";
                saveTasks();
                renderTasks();
                await updateTotalTasks(currentUserId, taskType);
            }
        });
    }

    // Function to toggle task completion
    window.toggleComplete = async (index) => {
        const currentUserId = getCurrentUserId();
        const task = tasks[index];
        const oldCompletedStatus = task.completed;

        task.completed = !oldCompletedStatus;
        saveTasks();
        renderTasks();

        if (oldCompletedStatus !== task.completed) { // Only update if status changed
            await updateCompletedTasks(currentUserId, task.type, task.completed);
        }
    };

    // Function to delete a task
    window.deleteTask = (index) => {
        // Note: Deleting a task does not currently decrement totalTarefas or tarefasConcluidas
        // This would require more complex logic to track if the deleted task was completed or not
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Initial render
    renderTasks();
});



// Estado da aplicação
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.currentFilter = "todas";
    this.currentSort = "data";
    this.selectedTasks = new Set();
    this.editingTaskId = null;

    this.initializeElements();
    this.bindEvents();
    this.render();
    this.updateStats();
  }

  // Inicializar elementos DOM
  initializeElements() {
    this.elements = {
      // Formulário
      taskForm: document.getElementById("formTarefas"),
      taskInput: document.getElementById("campoEntrada"),
      prioritySelect: document.getElementById("taskPriority"),

      // Controles
      searchInput: document.getElementById("searchInput"),
      filterButtons: document.querySelectorAll(".filter-btn"),
      sortSelect: document.getElementById("sortSelect"),

      // Lista e estatísticas
      tasksList: document.getElementById("listaTarefas"),
      emptyState: document.getElementById("emptyState"),
      totalTasks: document.getElementById("totalTasks"),
      completedTasks: document.getElementById("completedTasks"),
      pendingTasks: document.getElementById("pendingTasks"),
      progressBar: document.getElementById("progressBar"),
      progressPercentage: document.getElementById("progressPercentage"),

      // Ações em massa
      selectAllBtn: document.getElementById("selectAllBtn"),
      deleteSelectedBtn: document.getElementById("deleteSelectedBtn"),
      clearAllBtn: document.getElementById("clearAllBtn"),
      exportBtn: document.getElementById("exportBtn"),

      // Modal
      taskModal: document.getElementById("taskModal"),
      closeModal: document.getElementById("closeModal"),
      editTaskName: document.getElementById("editTaskName"),
      editTaskPriority: document.getElementById("editTaskPriority"),
      editTaskNotes: document.getElementById("editTaskNotes"),
      cancelEdit: document.getElementById("cancelEdit"),
      saveEdit: document.getElementById("saveEdit"),

      // Toast
      toastContainer: document.getElementById("toastContainer"),
    };
  }

  // Vincular eventos
  bindEvents() {
    // Formulário principal
    this.elements.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTask();
    });

    // Busca
    this.elements.searchInput.addEventListener("input", () => {
      this.render();
    });

    // Filtros
    this.elements.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setFilter(btn.dataset.filter);
      });
    });

    // Ordenação
    this.elements.sortSelect.addEventListener("change", () => {
      this.currentSort = this.elements.sortSelect.value;
      this.render();
    });

    // Ações em massa
    this.elements.selectAllBtn.addEventListener("click", () => {
      this.toggleSelectAll();
    });

    this.elements.deleteSelectedBtn.addEventListener("click", () => {
      this.deleteSelectedTasks();
    });

    this.elements.clearAllBtn.addEventListener("click", () => {
      this.clearAllTasks();
    });

    this.elements.exportBtn.addEventListener("click", () => {
      this.exportTasks();
    });

    // Modal
    this.elements.closeModal.addEventListener("click", () => {
      this.closeModal();
    });

    this.elements.cancelEdit.addEventListener("click", () => {
      this.closeModal();
    });

    this.elements.saveEdit.addEventListener("click", () => {
      this.saveTaskEdit();
    });

    this.elements.taskModal.addEventListener("click", (e) => {
      if (e.target === this.elements.taskModal) {
        this.closeModal();
      }
    });

    // Atalhos de teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
      if (e.ctrlKey && e.key === "Enter") {
        this.addTask();
      }
    });
  }

  // Adicionar nova tarefa
  addTask() {
    const text = this.elements.taskInput.value.trim();
    const priority = this.elements.prioritySelect.value;

    if (!text) {
      this.showToast("Por favor, digite uma tarefa!", "warning");
      return;
    }

    const task = {
      id: Date.now(),
      text,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      notes: "",
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.render();
    this.updateStats();

    // Limpar formulário
    this.elements.taskInput.value = "";
    this.elements.prioritySelect.value = "media";

    this.showToast("Tarefa adicionada com sucesso!", "success");
  }

  // Alternar status da tarefa
  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
      this.updateStats();

      const message = task.completed ? "Tarefa concluída!" : "Tarefa reaberta!";
      this.showToast(message, "success");
    }
  }

  // Excluir tarefa
  deleteTask(id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.saveTasks();
      this.render();
      this.updateStats();
      this.showToast("Tarefa excluída!", "success");
    }
  }

  // Editar tarefa
  editTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      this.editingTaskId = id;
      this.elements.editTaskName.value = task.text;
      this.elements.editTaskPriority.value = task.priority;
      this.elements.editTaskNotes.value = task.notes || "";
      this.openModal();
    }
  }

  // Salvar edição da tarefa
  saveTaskEdit() {
    const task = this.tasks.find((t) => t.id === this.editingTaskId);
    if (task) {
      const newText = this.elements.editTaskName.value.trim();

      if (!newText) {
        this.showToast("Por favor, digite um nome para a tarefa!", "warning");
        return;
      }

      task.text = newText;
      task.priority = this.elements.editTaskPriority.value;
      task.notes = this.elements.editTaskNotes.value.trim();

      this.saveTasks();
      this.render();
      this.closeModal();
      this.showToast("Tarefa atualizada!", "success");
    }
  }

  // Definir filtro
  setFilter(filter) {
    this.currentFilter = filter;

    // Atualizar botões de filtro
    this.elements.filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });

    this.render();
  }

  // Alternar seleção de todas as tarefas
  toggleSelectAll() {
    const visibleTasks = this.getFilteredTasks();

    if (this.selectedTasks.size === visibleTasks.length) {
      this.selectedTasks.clear();
    } else {
      visibleTasks.forEach((task) => this.selectedTasks.add(task.id));
    }

    this.render();
    this.updateBulkActions();
  }

  // Excluir tarefas selecionadas
  deleteSelectedTasks() {
    if (this.selectedTasks.size === 0) return;

    if (
      confirm(
        `Tem certeza que deseja excluir ${this.selectedTasks.size} tarefa(s)?`
      )
    ) {
      this.tasks = this.tasks.filter((t) => !this.selectedTasks.has(t.id));
      this.selectedTasks.clear();
      this.saveTasks();
      this.render();
      this.updateStats();
      this.updateBulkActions();
      this.showToast("Tarefas excluídas!", "success");
    }
  }

  // Limpar todas as tarefas
  clearAllTasks() {
    if (this.tasks.length === 0) return;

    if (confirm("Tem certeza que deseja excluir TODAS as tarefas?")) {
      this.tasks = [];
      this.selectedTasks.clear();
      this.saveTasks();
      this.render();
      this.updateStats();
      this.updateBulkActions();
      this.showToast("Todas as tarefas foram excluídas!", "success");
    }
  }

  // Exportar tarefas
  exportTasks() {
    if (this.tasks.length === 0) {
      this.showToast("Não há tarefas para exportar!", "warning");
      return;
    }

    const data = {
      tasks: this.tasks,
      exportDate: new Date().toISOString(),
      totalTasks: this.tasks.length,
      completedTasks: this.tasks.filter((t) => t.completed).length,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tarefas-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast("Tarefas exportadas!", "success");
  }

  // Obter tarefas filtradas
  getFilteredTasks() {
    let filtered = [...this.tasks];

    // Aplicar filtro de busca
    const searchTerm = this.elements.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.text.toLowerCase().includes(searchTerm) ||
          (task.notes && task.notes.toLowerCase().includes(searchTerm))
      );
    }

    // Aplicar filtro de status
    switch (this.currentFilter) {
      case "pendentes":
        filtered = filtered.filter((task) => !task.completed);
        break;
      case "concluidas":
        filtered = filtered.filter((task) => task.completed);
        break;
    }

    // Aplicar ordenação
    switch (this.currentSort) {
      case "alfabetica":
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "prioridade":
        const priorityOrder = { alta: 3, media: 2, baixa: 1 };
        filtered.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        break;
      case "data":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  }

  // Renderizar lista de tarefas
  render() {
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      this.elements.tasksList.style.display = "none";
      this.elements.emptyState.style.display = "flex";
    } else {
      this.elements.tasksList.style.display = "block";
      this.elements.emptyState.style.display = "none";

      this.elements.tasksList.innerHTML = filteredTasks
        .map((task) => this.createTaskHTML(task))
        .join("");

      // Adicionar event listeners para as tarefas
      this.bindTaskEvents();
    }

    this.updateBulkActions();
  }

  // Criar HTML da tarefa
  createTaskHTML(task) {
    const createdDate = new Date(task.createdAt).toLocaleDateString("pt-BR");
    const isSelected = this.selectedTasks.has(task.id);

    return `
      <li class="task-item ${task.completed ? "completed" : ""}" data-id="${
      task.id
    }">
        <input type="checkbox" class="task-select" ${isSelected ? "checked" : ""}>
        <div class="task-checkbox ${task.completed ? "checked" : ""}" data-action="toggle"></div>
        <div class="task-content" data-action="edit">
          <div class="task-text">${this.escapeHtml(task.text)}</div>
          <div class="task-meta">
            <span class="task-priority ${task.priority}">
              <i class="fas fa-circle"></i>
              ${task.priority}
            </span>
            <span class="task-date">
              <i class="fas fa-calendar"></i>
              ${createdDate}
            </span>
            ${
              task.notes
                ? `<span class="task-has-notes"><i class="fas fa-sticky-note"></i> Com notas</span>`
                : ""
            }
          </div>
        </div>
        <div class="task-actions">
          <button class="task-action-btn edit" data-action="edit" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="task-action-btn delete" data-action="delete" title="Excluir">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    `;
  }

  // Vincular eventos das tarefas
  bindTaskEvents() {
    this.elements.tasksList.addEventListener("click", (e) => {
      const taskItem = e.target.closest(".task-item");
      if (!taskItem) return;

      const taskId = parseInt(taskItem.dataset.id);
      const action = e.target.dataset.action || e.target.closest("[data-action]")?.dataset.action;

      switch (action) {
        case "toggle":
          this.toggleTask(taskId);
          break;
        case "edit":
          this.editTask(taskId);
          break;
        case "delete":
          this.deleteTask(taskId);
          break;
      }
    });

    // Event listener para checkboxes de seleção
    this.elements.tasksList.addEventListener("change", (e) => {
      if (e.target.classList.contains("task-select")) {
        const taskItem = e.target.closest(".task-item");
        const taskId = parseInt(taskItem.dataset.id);

        if (e.target.checked) {
          this.selectedTasks.add(taskId);
        } else {
          this.selectedTasks.delete(taskId);
        }

        this.updateBulkActions();
      }
    });
  }

  // Atualizar ações em massa
  updateBulkActions() {
    const hasSelected = this.selectedTasks.size > 0;
    const visibleTasks = this.getFilteredTasks();
    const allSelected = this.selectedTasks.size === visibleTasks.length && visibleTasks.length > 0;

    this.elements.deleteSelectedBtn.style.display = hasSelected ? "flex" : "none";
    this.elements.selectAllBtn.innerHTML = `
      <i class="fas fa-${allSelected ? "minus" : "check"}-square"></i>
      ${allSelected ? "Desmarcar Todas" : "Selecionar Todas"}
    `;
  }

  // Atualizar estatísticas
  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    this.elements.totalTasks.textContent = total;
    this.elements.completedTasks.textContent = completed;
    this.elements.pendingTasks.textContent = pending;
    this.elements.progressBar.style.width = `${percentage}%`;
    this.elements.progressPercentage.textContent = `${percentage}%`;
  }

  // Abrir modal
  openModal() {
    this.elements.taskModal.classList.add("show");
    this.elements.editTaskName.focus();
  }

  // Fechar modal
  closeModal() {
    this.elements.taskModal.classList.remove("show");
    this.editingTaskId = null;
  }

  // Mostrar toast
  showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconMap = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      warning: "fa-exclamation-triangle",
    };

    toast.innerHTML = `
      <i class="fas ${iconMap[type]} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;

    this.elements.toastContainer.appendChild(toast);

    // Remover após 3 segundos
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Salvar tarefas no localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Escapar HTML
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new TaskManager();
});


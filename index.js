const TodoApp = (() => {
    // Cache de elementos DOM
    const DOM = {
      taskForm: document.getElementById('taskForm'),
      taskInput: document.getElementById('taskInput'),
      taskList: document.getElementById('taskList')
    };
  
    // Persistência de dados com fallback para array vazio
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Event Delegation para elementos dinâmicos
    DOM.taskList.addEventListener('click', (e) => {
      if (e.target.matches('.delete-btn')) {
        const taskId = Number(e.target.closest('li').dataset.id); // Convertendo para número
        deleteTask(taskId);
      }
    });
  
    // Função para deletar tarefas
    const deleteTask = (id) => {
      tasks = tasks.filter(task => task.id !== id);
      saveToStorage();
      renderTasks();
    };
  
    // Função para salvar no localStorage
    const saveToStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Renderização das tarefas
    const renderTasks = () => {
      DOM.taskList.innerHTML = tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" 
            data-id="${task.id}"
            style="animation: fadeIn 0.3s ease-in-out">
          <span class="task-text">${task.text}</span>
          <button class="delete-btn" aria-label="Excluir tarefa">Concluir</button>
        </li>
      `).join('');
    };
  
    // Inicialização do app
    return {
      init: () => {
        DOM.taskForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (DOM.taskInput.value.trim()) {
            tasks.push({
              id: Date.now(), // Garantindo que o ID seja único
              text: DOM.taskInput.value.trim(),
              completed: false
            });
            DOM.taskInput.value = '';
            saveToStorage();
            renderTasks();
          }
        });
        renderTasks();
      }
    };
  })();
  
  // Inicializa a aplicação
  TodoApp.init();
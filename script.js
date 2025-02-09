// =============== MODAL FUNCTIONALITY ===============

let currentCard = null;
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');

// Event Delegation para cards dinâmicos
document.body.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        currentCard = e.target.closest('.card');
        openModal(currentCard);
    }
});

function openModal(card) {
    // Carregar dados existentes
    const description = card.dataset.description || '';
    const labels = JSON.parse(card.dataset.labels || '[]');
    const checklist = JSON.parse(card.dataset.checklist || '[]');

    // Preencher modal
    document.getElementById('card-description').value = description;
    renderChecklist(checklist);
    updateLabels(labels);

    modal.style.display = 'block';
}

function renderChecklist(items) {
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = items.map((item, index) => `
        <li>
            <input type="checkbox" ${item.completed ? 'checked' : ''} 
                   onchange="updateChecklistItem(${index}, this.checked)">
            <input type="text" value="${item.text}" 
                   onchange="updateChecklistItemText(${index}, this.value)">
            <button onclick="removeChecklistItem(${index})">🗑️</button>
        </li>
    `).join('');
}

function updateLabels(selectedLabels) {
    document.querySelectorAll('.label').forEach(label => {
        label.classList.toggle('selected', selectedLabels.includes(label.dataset.color));
    });
}

// =============== EVENT HANDLERS ===============

// Fechar modal
closeModalBtn.onclick = () => modal.style.display = 'none';

// Fechar ao clicar fora do modal
window.onclick = (e) => e.target === modal && (modal.style.display = 'none');

// Adicionar nova tarefa
document.getElementById('add-task').addEventListener('click', () => {
    const checklist = JSON.parse(currentCard.dataset.checklist || '[]');
    checklist.push({ text: 'Nova Tarefa', completed: false });
    currentCard.dataset.checklist = JSON.stringify(checklist);
    renderChecklist(checklist);
});

// Salvar alterações
document.getElementById('save-changes').addEventListener('click', () => {
    const labels = Array.from(document.querySelectorAll('.label.selected'))
                      .map(label => label.dataset.color);
    
    currentCard.dataset.description = document.getElementById('card-description').value;
    currentCard.dataset.labels = JSON.stringify(labels);
    
    saveBoard();
    modal.style.display = 'none';
});

// =============== CHECKLIST FUNCTIONS ===============

window.updateChecklistItem = (index, completed) => {
    const checklist = JSON.parse(currentCard.dataset.checklist);
    checklist[index].completed = completed;
    currentCard.dataset.checklist = JSON.stringify(checklist);
    saveBoard();
};

window.updateChecklistItemText = (index, text) => {
    const checklist = JSON.parse(currentCard.dataset.checklist);
    checklist[index].text = text;
    currentCard.dataset.checklist = JSON.stringify(checklist);
    saveBoard();
};

window.removeChecklistItem = (index) => {
    const checklist = JSON.parse(currentCard.dataset.checklist);
    checklist.splice(index, 1);
    currentCard.dataset.checklist = JSON.stringify(checklist);
    renderChecklist(checklist);
    saveBoard();
};
// Função para permitir soltar o card
function allowDrop(event) {
    event.preventDefault();
  }
  
  // Função para iniciar o arrasto do card
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  // Função para soltar o card
  function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text");
    const card = document.getElementById(cardId);
    event.target.appendChild(card);
    saveBoard();
  }
  
  // Função para adicionar um novo card
  function addCard(columnId) {
    const column = document.getElementById(columnId).querySelector('.cards');
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = `card-${Date.now()}`;
    card.setAttribute('ondragstart', 'drag(event)');
    card.textContent = 'Novo Card';
    column.appendChild(card);
    saveBoard();
  }
  
  // Função para salvar o estado do quadro
  function saveBoard() {
    const board = {
      todo: document.getElementById('todo').innerHTML,
      doing: document.getElementById('doing').innerHTML,
      done: document.getElementById('done').innerHTML
    };
    localStorage.setItem('board', JSON.stringify(board));
  }
  
  // Função para carregar o estado do quadro
  function loadBoard() {
    const savedBoard = JSON.parse(localStorage.getItem('board'));
    if (savedBoard) {
      document.getElementById('todo').innerHTML = savedBoard.todo;
      document.getElementById('doing').innerHTML = savedBoard.doing;
      document.getElementById('done').innerHTML = savedBoard.done;
    }
  }
  
  // Carregar o quadro ao iniciar
  loadBoard();
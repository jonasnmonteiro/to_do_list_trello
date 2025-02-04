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
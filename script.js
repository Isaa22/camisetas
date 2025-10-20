// Array para armazenar os pedidos
let orders = [];

// Elementos do DOM
const orderForm = document.getElementById('order-form');
const ordersBody = document.getElementById('orders-body');
const summaryCards = document.getElementById('summary-cards');

// Função para adicionar um pedido
function addOrder(name, color, size) {
    const order = {
        id: Date.now(), // ID único baseado no timestamp
        name: name,
        color: color,
        size: size
    };
    
    orders.push(order);
    updateOrdersTable();
    updateSummary();
    
    // Limpar o formulário
    orderForm.reset();
}

// Função para remover um pedido
function removeOrder(id) {
    orders = orders.filter(order => order.id !== id);
    updateOrdersTable();
    updateSummary();
}

// Função para atualizar a tabela de pedidos
function updateOrdersTable() {
    ordersBody.innerHTML = '';
    
    if (orders.length === 0) {
        ordersBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum pedido registrado ainda.</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = order.name;
        
        const colorCell = document.createElement('td');
        colorCell.textContent = order.color;
        
        const sizeCell = document.createElement('td');
        sizeCell.textContent = order.size;
        
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => removeOrder(order.id));
        
        actionCell.appendChild(deleteButton);
        
        row.appendChild(nameCell);
        row.appendChild(colorCell);
        row.appendChild(sizeCell);
        row.appendChild(actionCell);
        
        ordersBody.appendChild(row);
    });
}

// Função para atualizar o resumo
function updateSummary() {
    summaryCards.innerHTML = '';
    
    // Contar pedidos por tamanho
    const sizeCount = {
        'P': 0,
        'M': 0,
        'G': 0,
        'GG': 0
    };
    
    orders.forEach(order => {
        sizeCount[order.size]++;
    });
    
    // Criar cards para cada tamanho
    for (const [size, count] of Object.entries(sizeCount)) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const title = document.createElement('h3');
        title.textContent = `Tamanho ${size}`;
        
        const countElement = document.createElement('p');
        countElement.textContent = count;
        
        card.appendChild(title);
        card.appendChild(countElement);
        
        summaryCards.appendChild(card);
    }
    
    // Adicionar card com total
    const totalCard = document.createElement('div');
    totalCard.classList.add('card');
    totalCard.style.backgroundColor = '#2ecc71';
    
    const totalTitle = document.createElement('h3');
    totalTitle.textContent = 'Total de Pedidos';
    
    const totalCount = document.createElement('p');
    totalCount.textContent = orders.length;
    
    totalCard.appendChild(totalTitle);
    totalCard.appendChild(totalCount);
    
    summaryCards.appendChild(totalCard);
}

// Event listener para o formulário
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    
    if (name && color && size) {
        addOrder(name, color, size);
    }
});

// Inicializar a tabela e o resumo
updateOrdersTable();
updateSummary();

document.addEventListener('DOMContentLoaded', function() {
    // Charger les statistiques
    loadStats();
    
    // Charger la liste des fichiers
    loadFiles();
    
    // Charger l'historique des transactions
    loadTransactions();
});

function loadStats() {
    // Simuler une requête AJAX pour obtenir les statistiques
    setTimeout(() => {
        document.getElementById('24h-count').textContent = '25';
        document.getElementById('3j-count').textContent = '18';
        document.getElementById('7j-count').textContent = '12';
        document.getElementById('30j-count').textContent = '8';
    }, 500);
}

function loadFiles() {
    // Simuler une requête AJAX pour obtenir les fichiers
    setTimeout(() => {
        const files = [
            { id: 1, type: '24h', file: 'vpn_24h_1.ovpn', created_at: '2023-05-15', used: false },
            { id: 2, type: '3j', file: 'vpn_3j_1.ovpn', created_at: '2023-05-14', used: true },
            { id: 3, type: '7j', file: 'vpn_7j_1.ovpn', created_at: '2023-05-13', used: false },
            { id: 4, type: '30j', file: 'vpn_30j_1.ovpn', created_at: '2023-05-10', used: false }
        ];
        
        const tbody = document.getElementById('files-table-body');
        tbody.innerHTML = '';
        
        files.forEach(file => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${file.id}</td>
                <td><span class="badge bg-${getBadgeColor(file.type)}">${getTypeName(file.type)}</span></td>
                <td>${file.file}</td>
                <td>${file.created_at}</td>
                <td>${file.used ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-x-circle-fill text-danger"></i>'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-download"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }, 800);
}

function loadTransactions() {
    // Simuler une requête AJAX pour obtenir les transactions
    setTimeout(() => {
        const transactions = [
            { id: 1001, date: '2023-05-15 14:30', amount: '1000 FC', type: '24h', status: 'completed', customer: 'client1@email.com' },
            { id: 1002, date: '2023-05-14 10:15', amount: '3000 FC', type: '3j', status: 'completed', customer: 'client2@email.com' },
            { id: 1003, date: '2023-05-13 16:45', amount: '5000 FC', type: '7j', status: 'failed', customer: 'client3@email.com' },
            { id: 1004, date: '2023-05-12 09:20', amount: '10000 FC', type: '30j', status: 'completed', customer: 'client4@email.com' }
        ];
        
        const tbody = document.getElementById('transactions-table-body');
        tbody.innerHTML = '';
        
        transactions.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tx.id}</td>
                <td>${tx.date}</td>
                <td>${tx.amount}</td>
                <td>${getTypeName(tx.type)}</td>
                <td><span class="badge bg-${tx.status === 'completed' ? 'success' : 'danger'}">${tx.status === 'completed' ? 'Complété' : 'Échoué'}</span></td>
                <td>${tx.customer}</td>
            `;
            tbody.appendChild(row);
        });
    }, 1000);
}

function getTypeName(type) {
    switch(type) {
        case '24h': return '24 Heures';
        case '3j': return '3 Jours';
        case '7j': return '7 Jours';
        case '30j': return '30 Jours';
        default: return type;
    }
}

function getBadgeColor(type) {
    switch(type) {
        case '24h': return 'primary';
        case '3j': return 'success';
        case '7j': return 'info';
        case '30j': return 'warning';
        default: return 'secondary';
    }
}

function uploadFile() {
    const fileType = document.getElementById('fileType').value;
    const fileInput = document.getElementById('vpnFile');
    const notes = document.getElementById('fileNotes').value;
    
    if (!fileInput.files.length) {
        alert('Veuillez sélectionner un fichier');
        return;
    }
    
    // Ici, vous enverriez normalement le fichier au serveur via AJAX
    // Pour cette démo, nous simulons simplement le processus
    alert(`Fichier ${fileInput.files[0].name} pour ${getTypeName(fileType)} sera uploadé. Notes: ${notes}`);
    
    // Fermer le modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addFileModal'));
    modal.hide();
    
    // Recharger la liste des fichiers
    loadFiles();
}
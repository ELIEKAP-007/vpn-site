document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner un forfait
    window.selectPlan = function(plan) {
        const select = document.getElementById('plan');
        switch(plan) {
            case '24h':
                select.value = '24h';
                break;
            case '3j':
                select.value = '3j';
                break;
            case '7j':
                select.value = '7j';
                break;
            case '30j':
                select.value = '30j';
                break;
        }
        
        // Faire défiler jusqu'au formulaire
        document.getElementById('vpn-form').scrollIntoView({ behavior: 'smooth' });
    };

    // Gestion du formulaire
    const form = document.getElementById('vpnRequestForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const plan = document.getElementById('plan').value;
        const email = document.getElementById('email').value;
        
        if (!plan) {
            alert('Veuillez sélectionner un forfait VPN');
            return;
        }
        
        // Déterminer le montant en fonction du forfait
        let amount = 0;
        let description = '';
        
        switch(plan) {
            case '24h':
                amount = 1000;
                description = 'VPN 24 Heures';
                break;
            case '3j':
                amount = 3000;
                description = 'VPN 3 Jours';
                break;
            case '7j':
                amount = 5000;
                description = 'VPN 7 Jours';
                break;
            case '30j':
                amount = 10000;
                description = 'VPN 30 Jours';
                break;
        }
        
        // Afficher le modal de paiement
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        paymentModal.show();
        
        // Initialiser le paiement Flutterwave
        makePayment(amount, description, email, plan);
    });
});

function makePayment(amount, description, email, plan) {
    // Remplacez par votre clé publique Flutterwave
    const FLW_PUBLIC_KEY = 'YOUR_FLUTTERWAVE_PUBLIC_KEY';
    
    FlutterwaveCheckout({
        public_key: FLW_PUBLIC_KEY,
        tx_ref: 'VPN-' + Date.now(),
        amount: amount,
        currency: 'CDF',
        payment_options: 'mobilemoney,card',
        customer: {
            email: email || 'client@vpnrdc.com',
        },
        customizations: {
            title: 'VPN RDC',
            description: description,
            logo: '/static/images/logo.png',
        },
        callback: function(response) {
            // Le paiement a réussi
            if (response.status === 'successful') {
                // Envoyer la demande au serveur pour obtenir le fichier VPN
                fetch('/get-vpn-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        transaction_id: response.transaction_id,
                        plan: plan,
                        email: email
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Télécharger le fichier VPN
                        window.location.href = data.download_url;
                    } else {
                        alert('Erreur: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Une erreur est survenue lors du traitement de votre demande.');
                });
            } else {
                alert('Le paiement a échoué ou a été annulé.');
            }
        },
        onclose: function() {
            // Le modal de paiement a été fermé
            console.log('Payment modal closed');
        }
    });
}
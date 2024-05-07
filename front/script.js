document.addEventListener('DOMContentLoaded', () => {
    const devisTable = document.getElementById('devisTable').getElementsByTagName('tbody')[0];
    const nouveauDevisBtn = document.getElementById('opportunite');

    const getDevisList = async () => {
        const response = await fetch('http://localhost:3000/devis')
           
        const devisList = await response.json();
        devisList.forEach(devis => {
            const row = `
                <tr>
                    <td>${devis.numero_opportunite}</td>
                    <td>${devis.nom_client}</td>
                    <td>${devis.tarif_propose}</td>
                    <td><a href="${devis.document_url}" target="_blank">&#128269</a></td>
                </tr>
            `;
            devisTable.innerHTML += row;
        });
    };
    getDevisList();
    
    nouveauDevisBtn.addEventListener('click', () => {
        location.replace("formulaire.html")
    });

    const nouveauDevisForm = document.getElementById('nouveauDevisForm');

    nouveauDevisForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const numeroOpportunite = document.getElementById('numeroOpportunite').value;
        const nomClient = document.getElementById('nomClient').value;
        const tarifPropose = document.getElementById('tarifPropose').value;
        const documentUrl = document.getElementById('documentUrl').value;

        const formData = {
            numero_opportunite: numeroOpportunite,
            nom_client: nomClient,
            tarif_propose: parseFloat(tarifPropose),
            document_url: documentUrl
        };
        try {
            const response = await fetch('http://localhost:3000/devis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Nouveau devis ajouté avec succès !');
            } else {
                throw new Error('Erreur lors de l\'ajout du nouveau devis');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});




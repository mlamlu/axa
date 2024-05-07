const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
var cors = require('cors');
app.use(cors());
app.use(express.json())

const db = new sqlite3.Database('./backend/db.sqlite');

app.use(express.static('frontend'));

app.get('/devis', (req, res) => {
    db.all('SELECT * FROM devis', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/devis', (req, res) => {
    console.log(req.body)
    const { numero_opportunite, nom_client, tarif_propose, document_url } = req.body;

    const insertQuery = 'INSERT INTO devis (numero_opportunite, nom_client, tarif_propose, document_url) VALUES (?, ?, ?, ?)';
    db.run(insertQuery, [numero_opportunite, nom_client, tarif_propose, document_url], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log(`Nouveau devis ajouté avec l'ID ${this.lastID}`);
            res.status(201).json({ message: 'Nouveau devis ajouté avec succès' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
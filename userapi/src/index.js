const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const dbConfig = require('../conf/db-config'); // Importer la configuration de la base de données

const app = express();
app.use(cors());
const port = 3000;

// Définition du moteur de template EJS
app.set('view engine', 'ejs');

// Middleware pour le traitement du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour afficher tous les utilisateurs
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM user';

    dbConfig.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            res.render(path.join(__dirname, 'views/users', 'index.ejs'), { users: results });
        }
    });
});
app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'DELETE FROM user WHERE id = ?';

    dbConfig.query(query, [userId], (error, result) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            if (result.affectedRows > 0) {
                res.sendStatus(204); // Utilisateur supprimé avec succès, pas de contenu à renvoyer
            } else {
                res.sendStatus(404); // Utilisateur non trouvé
            }
        }
    });
});
// Affichage du formulaire pour ajouter un nouvel utilisateur
app.get('/users/new', (req, res) => {
    res.render(path.join(__dirname, 'views/users', 'new.ejs'), { updated: 0 });
});

// Traitement de la soumission du formulaire pour ajouter un nouvel utilisateur
app.post('/users/new', (req, res) => {
    console.log(req.body)
    const { name,prenom,email } = req.body;
    const query = 'INSERT INTO user (name,prenom,email) VALUES (?, ?,?)';

    dbConfig.query(query, [name,prenom,email], (error, result) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            const insertedUserId = result.insertId;
            res.status(201).json({ id: insertedUserId, name,prenom,email });
        }
    });
});

app.get('/users/show/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM user WHERE id = ?';

    dbConfig.query(query, [userId], (error, results) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else if (results.length === 0) {
            res.sendStatus(404);
        } else {
            const user = results[0];
            res.render(path.join(__dirname, 'views/users', 'new.ejs'), { user: user, updated: 1 });
        }
    });
});
app.post('/users/show/:userId', (req, res) => {
    const userId = req.params.userId;
    const {name,prenom,email } = req.body;
    const query = 'UPDATE user SET name = ?, prenom = ?, email = ? WHERE id = ?';

    dbConfig.query(query, [name,prenom,email, userId], (error, result) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
            res.redirect('/users');
        }
    });
});
// ...

// Démarre le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

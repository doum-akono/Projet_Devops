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
    const query = 'SELECT * FROM users';

    dbConfig.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            res.render(path.join(__dirname, 'views', 'users.ejs'), { users: results });
        }
    });
});
app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'DELETE FROM users WHERE id = ?';

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

// ...

// Démarre le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

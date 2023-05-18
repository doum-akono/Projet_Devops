
# Application web API utilisateur

Il s'agit d'une application web NodeJS de base exposant une API REST qui crée et stocke les paramètres utilisateur dans une base de données Redis.
## Fonctionnalités
- Démarrer un serveur web
- Créer un utilisateur
- Obtenir un utilisateur
## Installation
Cette application est écrite en NodeJS et utilise une base de données Redis.

- Installer NodeJS
- Installer Redis
- Installer l'application
Aller dans le répertoire racine de l'application (où se trouve le fichier **`package.json`**) et exécuter :

```bash
  npm install
```
## Utilisation

### Démarrer un serveur web
À partir du répertoire racine du projet, exécuter :

```bash
  npm start
```
Cela démarrera un serveur web disponible dans votre navigateur à l'adresse http://localhost:3000.

### Créer un utilisateur
Envoyer une demande POST (protocole REST) en utilisant le terminal :
```bash
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user

```
Le résultat affichera :

```bash
{"status":"success","msg":"OK"}
```

Une autre façon de tester votre API REST est d'utiliser Postman.

### Tests
À partir du répertoire racine du projet, exécuter :

```bash
npm test
```
## Screenshots
### Liste des utilisateurs
![App Screenshot](userapi/screenshoot/1.png)

### Ajout d'un nouvel utilisateur
![App Screenshot](userapi/screenshoot/2.png)


### Modification d'un utilisateur
![App Screenshot](userapi/screenshoot/3.png)

### Suppression d'un utilisateur
![App Screenshot](userapi/screenshoot/4.png)

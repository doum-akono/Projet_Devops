#Image de base appropriée pour notre application
FROM node:14

# Le répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de notre application dans le conteneur
COPY ../userapi/package.json package-lock.json /app/
COPY ../userapi/conf /app/conf
COPY ../userapi/src /app/src

# Installation des dépendances de l'application
RUN npm ci --production

# Port sur lequel notre application écoute
EXPOSE 3000

# Démarrage notre application lorsque le conteneur démarre
CMD ["npm", "start"]
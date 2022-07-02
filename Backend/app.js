// importation d'express pour créer des applis web avec Node
const express = require('express');
// pour protéger les informations de connexion vers la base de données
require('dotenv').config();

// je fais appel au module Express 
// le mot-clé app fait souvent référence au module express
// on peut utiliser un autre nom, mais c'est la convention
const app = express();
// Analyse les corps de requête entrants dans un middleware
const bodyparser = require('body-parser');

// pour pouvoir travailler avec les chemins des fichiers
const path = require("path");
const auth = require("./middleware/auth");
// pour sécuriser les en-tête http de l'application express
const helmet = require('helmet');
const cors = require('cors');


// routes
const authRoutes = require("./routes/auth"); // Importation de la route auth //
const userRoutes = require("./routes/user"); // Importation de la route user //
const messageRoutes = require("./routes/message"); // Importation de la route message //
const commentRoutes = require("./routes/comment"); // Importation de la route comment //


//connexion avec la BDD
//const { sequelize } = require("./models/index");
require("./config/db_mysql");

//autorisations d'accès
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // On accède à l'API depuis diverses origines //
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Liste des requêtes autorisées // 
    next();
});


// protection de l'appli de certaines vulnerabilités en protégeant les en-têtes
app.use(helmet());
app.use(cors());


// pour gérer la requête Post venant de l'appli front, on a besoin d'en extraire le corps JSON
// middleware mis a dispo par Express :
app.use(express.json());
// pour analyser les corps de requête entrants ds un middleware
app.use(bodyparser.json());

// Pour toute requête envoyée à /images/, on sert ce dossier statique image //
// indique à Express qu'il faut gérer la ressource images de manière statique //
app.use('/images', express.static(path.join(__dirname, 'images')));
// Enregistrement des routeurs //
app.use("/api/auth", authRoutes)
app.use("/api/users", auth, userRoutes)
app.use("/api/messages", auth, messageRoutes)
app.use("/api/comments", auth,commentRoutes)

// Exportation appli express pour y avoir accès depuis les autres fichiers
module.exports = app; 
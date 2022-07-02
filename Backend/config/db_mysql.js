// importation de sequelize
const Sequelize = require('sequelize');
// Pour protéger les informations de connexion vers la BDD
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 3307,
    dialect: 'mysql'
});


sequelize
// Fonction pour tester si la connexion est OK
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données Groupomania');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize
global.sequelize = sequelize;
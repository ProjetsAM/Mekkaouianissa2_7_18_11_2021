const db = require("../models");
// importation du modèle users
const User = db.users; 
const bcrypt = require("bcrypt"); // Hachage du password //
// pour créer des tokens introuvable et sécuriser la connexion au compte utilisateur.
const jwt = require("jsonwebtoken"); // Sécurisation de la connection grâce à des tokens uniques //

// pour protéger les informations de connexion vers la BDD
require("dotenv").config()

// création d'un compte user
exports.signup = (req, res) => {
  bcrypt // fonction pour hacher un MDP
  // hashage 10 fois du password avec bcrypt
    .hash(req.body.password, 10)
    // on récupère le hash
    .then((hash) => {
      // créer un nouvel utilisateur
     // on enregistre le hash dans un nouveau user avec l'email de la requete
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,// récupère le corps de la requête = email
        password: hash,// hash le password quand l'utilisateur le crée
        admin: false,
      });
      // on enregistre cet user dans la base de donnée
      user
        .save() // sauvegarder l'utilisateur dans la base de données
        // message de réussite renvoyé en json, code 201 : requête réussie + création de source
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
         // ou message en cas d'erreur, code 400 mauvaise requete du client  
        .catch((error) => res.status(400).json({ error }));
    })
    // message erreur code 500 : erreur serveur
    .catch((error) => res.status(500).json({ error }));
};

// connexion à un compte existant
exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })  
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({ // Si comparaison ok, on renvoit un objet JSON contenant : //
            message: "Utilisateur connecté !",
            userId: user.id, // L'userID +
            userName: user.userName, // L'userName +
            avatar: user.avatar, // L'avatar +
            token: jwt.sign( // Un token  - Fonction sign de JsonWebToken
              { userId: user.id }, // 1er argument  : données à encoder
               process.env.SECRET_KEY, // 2ème : clé secrète encodage
              { expiresIn: "24h" } // 3ème : argument de configuration
            ),
           
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
const express = require("express") // On a besoin d'express  pour créer le routeur //
const router = express.Router() // Création du routeur //

// Importation de la logique métier des controllers à utiliser sur les routes//
const authCtrl = require("../controllers/auth")

// les routes pour créer un compte et se connecter au compte
// routes POST car le front-end envoi l'adresse mail et mdp
// Les routes fournies sont celles prévues par l'application front-end.
router.post("/signup", authCtrl.signup)

router.post("/login", authCtrl.login)

//On exporte pour pouvoir importer dans app.js
module.exports = router 

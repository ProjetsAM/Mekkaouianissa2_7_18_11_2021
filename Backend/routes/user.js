const express = require("express") // On a besoin d'express  pour créer le routeur //
const router = express.Router() // Création du routeur //

// Importation de la logique métier des controllers à utiliser sur les routes//
const userCtrl = require("../controllers/user")
const multer = require("../middleware/multer-config")

// Configuration des routes //
// Pour afficher un utilisateur //
router.get("/:id", userCtrl.findOneUser)
// Pour modifier un utilisateur //
router.put("/:id", multer, userCtrl.modifyUser)
// Pour supprimer un utilisateur//
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
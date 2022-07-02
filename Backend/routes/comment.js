const express = require("express") // On a besoin d'express  pour créer le routeur //
const router = express.Router() // Création du routeur //

// Importation de la logique métier des controllers à utiliser sur les routes//
const commentCtrl = require("../controllers/comment")

// Pour afficher les messages //
router.get("/messages/:id", commentCtrl.findAllComments)
// Pour afficher un message //
router.get("/:id", commentCtrl.findOneComment)
// Pour créer un message //
router.post("/", commentCtrl.createComment)
// Pour modifier un message //
router.put("/:id", commentCtrl.modifyComment)
// Pour supprimer un commentaire //
router.delete("/:id", commentCtrl.deleteComment)

module.exports = router
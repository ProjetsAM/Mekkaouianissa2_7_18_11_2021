const express = require("express") // On a besoin d'express  pour créer le routeur //
const router = express.Router() // Création du routeur //

// Importation de la logique métier des controllers à utiliser sur les routes//
const messageCtrl = require("../controllers/message")
const multer = require("../middleware/multer-config")

// Configuration des routes //
// Pour afficher tous les messages //
router.get("/", messageCtrl.findAllMessages)
// Pour afficher les messages d'un user //
router.get("/users/:id", messageCtrl.findAllMessagesForOne)
// Pour afficher un message //
router.get("/:id", messageCtrl.findOneMessage)
// Pour poster un message //
router.post("/", multer, messageCtrl.createMessage)
// Pour modifier un message //
router.put("/:id", multer, messageCtrl.modifyMessage)
// Pour supprimer un message //
router.delete("/:id", messageCtrl.deleteMessage)

module.exports = router
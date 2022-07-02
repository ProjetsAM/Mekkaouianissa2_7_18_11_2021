//Configuration protégeant les routes en vérifiant l'authentification avant envoi des requêtes
// pour créer des tokens aléatoires et uniques pour la connexion
const jwt = require("jsonwebtoken")
//Pour protéger les informations de connexion vers la BDD 
require("dotenv").config()

module.exports = (req, res, next) => { // On exporte un middleware //
    try {
        const token = req.headers.authorization.split(" ")[1] // Récupération du token dans le header ds un tableau split et on retourne le 2ème élément//
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY) // On décode le TOKEN, la clé doit correspondre à celle de la fonction login//
        const userId = decodedToken.userId; //On récupère l'userId //
        
        if (req.body.userId && req.body.userId !== userId) { // Si l'userId du corps de la requête est différent du UserId //
            throw "Utilisateur non-reconnu !" // Throw pour renvoyer l'erreur //
        } else {
            next() // Tout est ok donc, on passe au prochain middleware //
        }
    } 
    catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" })
    }
};


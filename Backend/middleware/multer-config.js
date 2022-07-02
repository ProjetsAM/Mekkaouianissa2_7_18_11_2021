// Gestion des fichiers entrants dans les requêtes HTTP avec multer //
const multer = require('multer');

// Librairie de traduction des types de fichiers pour développement //
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({  // Objet storage pour avoir des noms de fichiers uniques//
  destination: (req, file, callback) => {
    //Le callback renvoie vers la destination d'enregistrement qui est le dossier images
    // null pour dire qu'il n'y a pas d'erreur
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //On élimine les espaces //
    const extension = MIME_TYPES[file.mimetype]; // Création de l'extension du fichier //
    callback(null, name + Date.now() + '.' + extension); // renvoie en callback le nom du fichier final // 
  }
});

// j'exporte multer en appelant la constante storage
// .single signifie que c'est un fichier unique et non un groupe
// "image" pour dire à multer qu'il s'agit d'un fichier image uniquement //
module.exports = multer({storage: storage}).single('image');
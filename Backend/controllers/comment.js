const db = require("../models");
const Comment = db.comments;
const User = db.users;

// trouver tous les commentaires
exports.findAllComments = (req, res) => {
  // const CommentsForOneMessage = {};
  Comment.findAll({
    where: {
      MessageId: req.params.id,
    },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"],
    },
    order: [["id", "DESC"]],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));

};


// trouver un commentaire
exports.findOneComment = (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
      required: true,
      attributes: ["userName"],
    },
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

// création d'un commentaire
exports.createComment = (req, res) => {
  const comment = new Comment({
    UserId: req.body.UserId,
    MessageId: req.body.MessageId,
    comment: req.body.comment,
  });
  comment
    .save() // Sauvegarder le commentaire dans la BDD
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modification d'un commentaire
exports.modifyComment = (req, res) => {
  Comment.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un commentaire
exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
    
};

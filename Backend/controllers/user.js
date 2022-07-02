const db = require("../models");
const User = db.users;
const Message = db.messages;
const Comment = db.comments;

// Trouver un user ou un admin
exports.findOneUser = (req, res) => {
  const userInfo = {};
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      userInfo.userName = user.userName;
      userInfo.email = user.email;
      if (user.isAdmin == false) {
        userInfo.role = "Utilisateur";
      } else {
        userInfo.role = "Administrateur";
      }
      userInfo.createdAt = user.createdAt;
      userInfo.avatar = user.avatar;
      userInfo.isActive = user.isActive;
    })
    .then(() => {
      Comment.count({ where: { userId: req.params.id } }).then((cmtcount) => {
        userInfo.commentsCount = cmtcount;
      });
    })
    .then(() => {
      Message.count({ where: { userId: req.params.id } }).then((msgcount) => {
        userInfo.messagesCount = msgcount;
        res.status(200).json(userInfo);
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

// Modifier un user
exports.modifyUser = (req, res) => {
  const userObject = req.file
    ? {
        ...req.body.userId,
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.update(
    { ...userObject, id: req.params.id },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ ...userObject }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer un user
exports.deleteUser = (req, res, _next) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Le client a été supprimé!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};
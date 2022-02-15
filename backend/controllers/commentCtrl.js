//Imports
const db = require("../models");

//Midellware

//Création d'un commentaire
exports.createComment = (req, res) => {
  if (req.body.content == null) {
    res.status(400).json({ message: "Veuillez écrire un message!" });
  }

  if (req.body.content <= 2) {
    res
      .status(400)
      .json({ message: "Veuillez écrire au moins 3 caractères !" });
  }

  db.Message.findOne({
    where: { id: req.body.messageId },
    
  })
    .then((message) => {
      if (message) {
        db.Comment.create({
          content: req.body.content,
          likes: 0,
          MessageId: message.id,
          UserId: req.decodedToken.userId
        })
          .then((comment) => {
            if (comment) {
              res
                .status(201)
                .json({
                  message: "Commentaire posté : " + comment.dataValues.content,
                });
            } else {
              res
                .status(500)
                .json({ error: "Impossible de poster le commentraire !" });
            }
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ message: "Message introuvable !" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//Récu^pérations de tout les commentaires
exports.getAllComments = (req, res) => {
  // db.Message.findAll()
  // .then((messages) => res.status(200).json({messages}))
  // .catch(error => res.status(400).json({error}))
};

//Récupération d'un commentaire via son ID
exports.getOneComment = (req, res) => {};

//Modification d'un commentaire
exports.updateComment = (req, res) => {};

//Suppression d'un commentaire
exports.deleteComment = (req, res) => {};

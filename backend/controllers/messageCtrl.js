//Imports
const db = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

//Midellware
//Création d'un message
exports.createMessage = (req, res) => {
  //On récupère l'userId de la personne connecté
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  console.log(userId);

  if (req.body.content == null) {
    res.status(400).json({ message: "Champs manquant(s) !" });
  }

  db.User.findOne({
    where: { id: userId }, //comme ca ou en decodant le token?
  })
    .then((user) => {
      if (user) {
        db.Message.create({
          content: req.body.content,
          attachment: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
      
          UserId: user.id,
        })
          .then((message) => {
            if (message) {
              res.status(201).json({
                message,
              });
            } else {
              res
                .status(500)
                .json({ error: "Impossible de poster le message !" });
            }
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } else {
        res.status(404).json({ message: "utilisateur non valide !" });
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
      console.log(err);
    });
};

//Récupération de tout les messages
exports.getAllMessages = (req, res) => {
  db.Message.findAll()
    .then((messages) => res.status(200).json({ messages }))
    .catch((error) => res.status(400).json({ error }));
};

//Récupération d'un message via son ID
exports.getOneMessage = (req, res) => {
  db.Message.findOne({
    where: { id: req.params.id },
  })
    .then((message) => {
      if (message) {
        res.status(200).json({ message });
      } else {
        res.status(404).json({ message: "Message introuvable" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//Modification d'un message
exports.updateMessage = (req, res) => {
  db.Message.findOne({
    where: { id: req.params.id },
  })
    .then((message) => {
      if (message) {
        message
          .update({
            content: req.body.content ? req.body.content : message.content,
            attachment: req.file
              ? `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`
              : message.attachment,
          })
          .then(() => {
            res.status(201).json({ message: "Message mis à jour !" });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ message: "message introuvable !" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
//supression d'un message
exports.deleteMessage = (req, res) => {
  db.Message.findOne({
    where: { id: req.params.id },
  })
    .then((message) => {
      message
        .destroy({
          where: { id: req.params.id },
        })
        .then(() => {
          res.status(200).json({ message: "Message supprimé !" });
        })
        .catch((err) => {
          res.status(400).json({ err: err });
        });
    })

    .catch((err) => {
      res.status(500).json({ err: err });
      console.log(err);
    });
};

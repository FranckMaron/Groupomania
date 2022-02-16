//Imports
const db = require("../models");
const jwt = require("jsonwebtoken");

//Midellware

//Création d'un message
exports.createMessage = (req, res) => {
  if (req.body.title == null || req.body.content == null) {
    res.status(400).json({ message: "Champs manquant(s) !" });
  }

  if (req.body.title.length <= 1 || req.body.content.length <= 2) {
    res.status(400).json({
      error:
        "Le titre doit comporter 2 caractère minimum, et le contenu 3 caractères minimum !",
    });
  }

  db.User.findOne({
    where: { id: req.body.userId },
  })
    .then((user) => {
      if (user) {
        db.Message.create({
          title: req.body.title,
          content: req.body.content,
          attachment: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
          likes: 0,
          UserId: user.id,
        })
          .then((message) => {
            if (message) {
              res.status(201).json({
                message: "Message posté : " + message.dataValues.content,
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
            title: req.body.title ? req.body.title : message.title,
            content: req.body.content ? req.body.content : message.content,
            attachment: req.file
              ? `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`
              : null,
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
  db.Message.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.status(200).json({ message: "Message supprimé !" });
    })

    .catch((err) => {
      res.status(500).json({ err });
    });
};

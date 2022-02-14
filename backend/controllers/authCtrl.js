//Imports
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const passwordValidator = require("password-validator");

// const schema = new passwordValidator();

// schema.is().min(8).has().not().spaces();

//Middleware
exports.signUp = (req, res) => {
  db.User.findOne({
    attributes: ["email"],
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const newUser = db.User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            isAdmin: 0,
          }).then((newUser) => {
            res.status(201).json({ userID: newUser.id });
          });
        });
      } else {
        res.status(409).json({ message: "Utilisateurs déja existant !" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err: "Impossible de vérifier les informations !" });
    });
};

exports.signIn = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (!user) {
      return res.status(401).json({error: "Utilisateur non trouvé !"})
    }
    bcrypt
    .compare(req.body.password, user.password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    })
    .catch((error) => res.status(500).json({ error }));
})
.catch((error) => res.status(500).json({ error }));
}; 

//Imports
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Middleware
//Fonction signUp
exports.signUp = (req, res) => {
  //Vérification des champs
  if (
    req.body.email == null ||
    req.body.prenom == null ||
    req.body.nom == null ||
    req.body.password == null
  ) {
    res.status(400).json({ error: "Champs manquant(s) !" });
  }

  //Validation des champs par Regex
  const emailRegex = /^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9-]{3,}\.[a-zA-Z0-9-]{2,}$/;
  const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,25}$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ error: "Format du mail non valide !" });
  }

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit contenir entre 7 et 25 caractères, et contenir au moins un chiffre !",
    });
  }

  if (
    req.body.prenom.length >= 15 ||
    req.body.prenom.length <= 2 ||
    req.body.nom.length >= 15 ||
    req.body.nom.length <= 2
  ) {
    return res.status(400).json({
      error: "Le nom et le prénom doivent contenir entre 3 et 15 caractères !",
    });
  }

  db.User.findOne({
    attributes: ["email"],
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          db.User.create({
            prenom: req.body.prenom,
            nom: req.body.nom,
            email: req.body.email,
            password: hash,
            picture: `${req.protocol}://${req.get("host")}/images/profildefault.jpg`,
            isAdmin: 0,
          }).then((newUser) => {
            res.status(201).json({ userID: newUser.id });
          });
        });
      } else {
        res.status(409).json({ error: "Email déja existant !" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err: "Impossible de vérifier les informations !" });
    });
};

//Fonction signIn
exports.signIn = (req, res) => {
  //Vérification des champs
  if (req.body.email == null || req.body.password == null) {
    res.status(400).json({ error: "Champs manquant(s) !" });
  }

  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Email inconnu !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            "RANDOM_TOKEN_SECRET"
          );
          res.status(200).json({
            userId: user.id,
            token: token,
            admin : user.isAdmin,
            picture: user.picture,
            bio: user.bio,
            createdAt: user.createdAt            
          });
          console.log(user.id);
        })

        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
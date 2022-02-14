//Imports
const db = require("../models");

//Midlleware

//Récuperations de tout les comptes
exports.getAllUsers = (req, res) => {
  db.User.findAll()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(404).json({ error }));
};

//Récupération d'un compte
exports.getUser = (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

//Modification d'un compte - Demander conseil à mon mentor
// exports.updateUser = (req, res) => {
//   db.User.update({ where: { id: req.params.id } })
//     .then((user) =>({
//         bio: req.body.bio,
//         picture: req.body.picture,
//       })
//     )
//     .then(() => res.status(201).json({ message: "profil modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

//Supression d'un compte
exports.deleteUser = (req, res) => {
  db.User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

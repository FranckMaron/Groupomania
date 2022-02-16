//Imports
const jwt = require("jsonwebtoken");

//Vérification de l'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userLogin && req.body.userLogin !== userId) {
      console.log(userId);
      console.log(req.body.userLogin);
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Requete non authentifiée" });
    console.log(error);
  }
};

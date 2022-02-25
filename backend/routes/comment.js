//Imports
const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//CRUD Commentaires
router.post("/new", auth, multer, commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getOneComment);
router.put("/:id", auth, multer, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;

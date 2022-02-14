//Imports
const router = require("express").Router()
const commentCtrl = require("../controllers/commentCtrl")

//CRUD Commentaires
router.post("/new", commentCtrl.createComment)
router.get("/", commentCtrl.getAllComments)
router.get("/:id", commentCtrl.getOneComment)
router.put("/:id", commentCtrl.updateComment)
router.delete("/:id", commentCtrl.deleteComment)



module.exports = router
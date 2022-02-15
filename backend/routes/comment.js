//Imports
const router = require("express").Router()
const commentCtrl = require("../controllers/commentCtrl")
const auth = require("../middleware/auth")
const multer =require("../middleware/multer-config")

//CRUD Commentaires
router.post("/new",auth, commentCtrl.createComment)
router.get("/",auth, commentCtrl.getAllComments)
router.get("/:id",auth, commentCtrl.getOneComment)
router.put("/:id",auth, multer, commentCtrl.updateComment)
router.delete("/:id",auth, commentCtrl.deleteComment)



module.exports = router

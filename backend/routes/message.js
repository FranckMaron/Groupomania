//Imports
const router = require("express").Router()
const messageCtrl = require("../controllers/messageCtrl")
const auth = require("../middleware/auth")

//CRUD Messsage
router.post("/new",auth, messageCtrl.createMessage)
router.get("/",auth, messageCtrl.getAllMessages)
router.get("/:id",auth, messageCtrl.getOneMessage)
router.put("/:id",auth, messageCtrl.updateMessage)
router.delete("/:id",auth, messageCtrl.deleteMessage)



module.exports = router
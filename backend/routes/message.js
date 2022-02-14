//Imports
const router = require("express").Router()
const messageCtrl = require("../controllers/messageCtrl")

//CRUD Messsage
router.post("/new", messageCtrl.createMessage)
router.get("/", messageCtrl.getAllMessages)
router.get("/:id", messageCtrl.getOneMessage)
router.put("/:id", messageCtrl.updateMessage)
router.delete("/:id", messageCtrl.deleteMessage)



module.exports = router
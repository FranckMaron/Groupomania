//Imports
const  router  = require("express").Router()
const authCtrl = require("../controllers/authCtrl")
const userCtrl = require("../controllers/userCtrl")

//Authentification
router.post("/register", authCtrl.signUp)
router.post("/login", authCtrl.signIn)

//CRUD USER
router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getUser)
// router.put("/:id", userCtrl.updateUser) - Demander à mon mentor
router.delete("/:id", userCtrl.deleteUser)


module.exports = router

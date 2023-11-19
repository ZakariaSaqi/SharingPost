const router = require("express").Router()
const {signup, login, verifyUserAccount} = require("../controllers/authController")
router.post("/signup", signup)
router.post("/login", login)
router.get("/:userId/verify/:token", verifyUserAccount)
module.exports = router
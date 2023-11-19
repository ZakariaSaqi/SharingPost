const router = require("express").Router();
const {
  sendResetPasswordLink,
  getResetPasswordLink,
  resetPassword,
} = require("../controllers/passwordController");

router.post("/resetPasswordLink", sendResetPasswordLink);
router
  .route("/resetPassword/:userId/:token")
  .get(getResetPasswordLink)
  .post(resetPassword);
module.exports = router;

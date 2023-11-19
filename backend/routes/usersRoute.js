const router = require("express").Router(); 
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verfiyToken");
const { getAllUsers, getUser, updateUserProfile, getUsersCount, profilePhotoUpload, deleteUserProfile } = require("../controllers/usersController");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

router.route("/profile").get(verifyTokenAndAdmin, getAllUsers)

router.route("/profile/:id")
.get(validateObjectId, getUser)
.put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfile)
.delete(validateObjectId, verifyTokenAndAuthorization , deleteUserProfile  )

router.route("/profile/profile-photo-upload").post(verifyToken, photoUpload.single("image"), profilePhotoUpload)

router.route("/count").get(verifyTokenAndAdmin, getUsersCount)
module.exports = router;
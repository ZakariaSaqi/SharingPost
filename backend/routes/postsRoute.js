const router = require("express").Router(); 
const { verifyToken } = require("../middlewares/verfiyToken");
const photoUpload = require("../middlewares/photoUpload");
const { createPost, getAllPosts, getSinglePost, getPostsCount, deletePost, updatePost, postImageUpdate, toggleLikePost } = require("../controllers/postController");
const validateObjectId = require("../middlewares/validateObjectId");

router.route("/")
.post(verifyToken, photoUpload.single("image"), createPost)
.get(getAllPosts)
router.route("/count").get(getPostsCount)
router.route("/:id")
.get( validateObjectId,getSinglePost)
.put(validateObjectId, verifyToken, updatePost)
.delete(validateObjectId, verifyToken, deletePost )

router.route("/post-image-update/:id").put(validateObjectId, verifyToken ,photoUpload.single("image"), postImageUpdate)

router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikePost )

module.exports = router;
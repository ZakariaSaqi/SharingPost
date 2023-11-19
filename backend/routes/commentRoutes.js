const router = require("express").Router(); 
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verfiyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const { createComment, getAllComments, deleteComment, updateComment } = require("../controllers/commentController");

router.route("/")
.post(verifyToken, createComment)
.get(verifyTokenAndAdmin, getAllComments)

router.route("/:id")
// .get( validateObjectId,getSinglePost)
.put(validateObjectId, verifyToken, updateComment)
.delete(validateObjectId, verifyToken, deleteComment )

module.exports = router;
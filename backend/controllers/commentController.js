const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/comment");
const { User } = require("../models/user");


module.exports.createComment = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  } 
  const profile = await User.findById(req.user.id)
   const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username
  });
  res.status(201).json(comment);
});

module.exports.getAllComments = asyncHandler(async (req, res) => {
   const   comments = await Comment.find()
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);

    res.status(200).json(comments);
  });

  module.exports.deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (req.user.isAdmin || req.user.id === comment.user.toString()) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Your comment has been deleted !" });
    } else {
      res.status(403).json({ message: "Acces denied !" });
    }
  });

  module.exports.updateComment = asyncHandler(async (req, res) => {
    const { error } = validateUpdateComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found !" });
    }
    if (req.user.id !== comment.user.toString()) {
      res.status(403).json({ message: "Acces denied, not allowed !" });
    }
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    )
    res.status(200).json(updateComment);
  });
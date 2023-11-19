const asyncHandler = require("express-async-handler");
const {
  Category,
  validateCreateCategory,
} = require("../models/category");
const { User } = require("../models/user");


module.exports.createCategory = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  } 
   const     category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(201).json(category);
});

module.exports.getAllCategories = asyncHandler(async (req, res) => {
   const categories = await Category.find()
    res.status(200).json( categories);
  });

  module.exports.deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (req.user.isAdmin) {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Your category has been deleted !" });
    } else {
      res.status(403).json({ message: "Acces denied !" });
    }
  });

//   module.exports.updateComment = asyncHandler(async (req, res) => {
//     const { error } = validateUpdateComment(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found !" });
//     }
//     if (req.user.id !== comment.user.toString()) {
//       res.status(403).json({ message: "Acces denied, not allowed !" });
//     }
//     const updateComment = await Comment.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           text: req.body.text,
//         },
//       },
//       { new: true }
//     )
//     res.status(200).json(updateComment);
//   });
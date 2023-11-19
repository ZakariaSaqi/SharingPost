const mongoose = require("mongoose");
const joi = require("joi");
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

function validateCreateComment(obj) {
  const schema = joi.object({
    postId: joi.string().required(),
    text: joi.string().trim().required(),
  });
  return schema.validate(obj);
}
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};

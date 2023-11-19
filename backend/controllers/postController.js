const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/comment");
module.exports.createPost = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided !" });
  }
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicID: result.public_id,
    },
  });
  res.status(200).json(post);
  fs.unlinkSync(imagePath);
});

module.exports.getAllPosts = asyncHandler(async (req, res) => {
  const POST_PER_PPAGE = 4;
  const { pageNumber, category } = req.query;
  let posts;
  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PPAGE)
      .limit(POST_PER_PPAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]); //except psw
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

module.exports.getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]).populate("comments");
  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }
  res.status(200).json(post);
});

module.exports.getPostsCount = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});

module.exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await cloudinaryRemoveImage(post.image.publicID);
    await Post.findByIdAndDelete(req.params.id);
    //delete all comments of post
    await Comment.deleteMany({postId : post._id})
    
    res.status(200).json({ message: "Your post has been deleted !" });
  } else {
    res.status(403).json({ message: "Acces denied !" });
  }
});

module.exports.updatePost = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }
  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: "Acces denied, not allowed !" });
  }
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);
  res.status(200).json(updatePost);
});

module.exports.postImageUpdate = asyncHandler(async (req, res) => {
  //validation
  if (!req.file) {
    res.status(400).json({ message: "No image provided" });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }
  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: "Acces denied, not allowed !" });
  }
  //Delete the old image
  await cloudinaryRemoveImage(post.image.publicID);
  //Get the path to img
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  //Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  console.log(result);
  //change image in DB
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicID: result.public_id,
        }
      }
    },
    { new: true }
  );

  //send resposne to client
  res.status(200).json(updatePost)
  //Remove img from server
  fs.unlinkSync(imagePath);
});
module.exports.toggleLikePost = asyncHandler(async (req, res) => {
    const {id : idPost} = req.params
    const loggedUserId = req.user.id
   let post = await Post.findById(idPost)
   if(!post){
    return res.status(404).json({ message: "Post not found !" }); 
   }
   const isPostLiked = post.likes.find(
    (user) => user.toString() === loggedUserId
   )
   if(isPostLiked){
    post = await Post.findByIdAndUpdate(
        idPost,
       { $pull : { likes : loggedUserId}},
       { new: true}
    )
   } else {
    post = await Post.findByIdAndUpdate(
        idPost,
       { $push : { likes : loggedUserId}},
       { new: true}
    )
   }
   res.status(200).json(post)
  });
  
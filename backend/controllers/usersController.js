const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/user");
const { Post } = require("../models/post");
const { Comment } = require("../models/comment");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs") //file system
const {
    cloudinaryRemoveImage,
    cloudinaryUploadImage,
    cloudinaryRemoveAllImage
} = require("../utils/cloudinary");
//get users profiles
module.exports.getAllUsers = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Not allow only for admin !" });
    }
    const users = await User.find()
    .select("-password")
    .populate("posts");
    res.status(200).json(users);
});
//get user profile
module.exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
    if (!user) {
        return res.status(404).json({ message: "User not found !" });
    }
    res.status(200).json(user);
});
//update user profile
module.exports.updateUserProfile = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                username: req.body.username,
                password: req.body.password,
            },
        },
        { new: true }
    ).populate("posts");
    res.status(200).json(updateUser);
});
//users count
module.exports.getUsersCount = asyncHandler(async (req, res) => {
    const count = await User.countDocuments();
    res.status(200).json(count);
});
//Profile photo upload : npm i multer cloudinary
module.exports.profilePhotoUpload = asyncHandler(async (req, res) => {
    //validation
    if (!req.file) {
        res.status(400).json({ message: "No file provided" });
    }
    //Get the path to img
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    //Upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    console.log(result);
    //Get user from DB
    const user = await User.findById(req.user.id);
    //Delete the old profile photo if exist
    if (user.profilePhoto.publicID) {
        await cloudinaryRemoveImage(user.profilePhoto.publicID);
    }
    //change prilephoto in DB
    user.profilePhoto = {
        url: result.secure_url,
        publicID: result.public_id,
    };
    await user.save();
    //send resposne to client
    res.status(200).json({
        message: "Your profile photo uploaded successfully",
        profilePhoto: {
            url: result.secure_url,
            publicID: result.public_id,
        },
    });
    //Remove img from server
    fs.unlinkSync(imagePath)
});

//dlete user profile
module.exports.deleteUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if(!user) {
    return res.status(404).json({ message : "User not found"})
   }
//    get all posts from db
   const posts = await Post.find({user : user._id});
//    get public ids from db
   const publicIds = posts?.map((post) => post.image.publicID)
// delete all post image from cloudinary
   if(publicIds?.length > 0){
    await cloudinaryRemoveAllImage(publicIds)
   }
   //delete profile pic
   if(user.profilePhoto.publicID !== null){
    await cloudinaryRemoveImage(user.profilePhoto.publicID)
   }
//    delte all posts and comments of the user
   await Post.deleteMany({ user : user.id})
   await Comment.deleteMany({ user : user.id})

   await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message : "Account has been deleted"});
});
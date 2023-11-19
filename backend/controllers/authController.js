const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateSignupUser,
  validateLoginUser,
} = require("../models/user");
const { verifyToken } = require("../middlewares/verfiyToken");
const VerificationToken = require("../models/verificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.signup = asyncHandler(async (req, res) => {
  //validation
  const { error } = validateSignupUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  //is exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "Email used" });
  //hash psw
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //new user
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  //sned email //
  // 1-craete ew verfiToken && save to db
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();
  // 2- making link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
  // 3- putting link in html temp
  const htmlTemplate = `
     <div>
     <p>Click in the link below to verify your email ! </p>
     <a href="${link}">Verify Email</a>
     </div>`;
  // 4- Sendi mail to user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);
  // 5- response to the client
  res.status(201).json({
    message: "We sent to you an email, Please verify your email inbox !",
  });
});

module.exports.login = asyncHandler(async (req, res) => {
  //validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  //is exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email not exists !" });
  //check psw
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Password incorrect !" });
  }
  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    if (!verificationToken) {
      const verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
    const htmlTemplate = `
     <div>
     <p>Click in the link below to verify your email ! <>
     <a href="${link}">Verify Email</a>
     </div>`;
    await sendEmail(user.email, "Verify Your Email", htmlTemplate);
    res.status(400).json({
      message: "We sent to you an email, Please verify your email inbox !",
    });
  }
  //generate token
  const token = user.generateAuthToken();
  await user.save();
  //sned response
  res.status(201).json({
    username: user.username,
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});
module.exports.verifyUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link!" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link!" });
  }

  user.isAccountVerified = true;
  await user.save();

  await VerificationToken.deleteOne({
    userId: user._id,
    token: req.params.token,
  });

  res.status(200).json({ message: "Your Account Verified." });
});

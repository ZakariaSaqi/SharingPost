const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/user");
const VerificationToken = require("../models/verificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.sendResetPasswordLink = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User email not found !" });
  }
  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save()
  }
  const link = `${process.env.CLIENT_DOMAIN}/resetPassword/${user._id}/${verificationToken.token}`;

  const htmlTemplate = `
     <div>
     <p>Click in the link below to reset your password account ! <>
     <a href="${link}">Reset Password</a>
     </div>`;
  await sendEmail(user.email, "Reset Password", htmlTemplate);
  res.status(201).json({
    message: "We sent to you an email, Please check your email inbox !",
  });
});

module.exports.getResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Invalide link !" });
  }
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(404).json({ message: "Invalide link !" });
  }
   
  res.status(200).json({ message: "Valid url !"});
}) ;

module.exports.resetPassword = asyncHandler(async (req, res) => {
    const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: " user Invalide Link !" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(404).json({ message: "token Invalide link !" });
  }
  if(!user.isAccountVerified){
    user.isAccountVerified = true
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword
  await user.save()
  await VerificationToken.deleteOne({ userId: user._id, token: req.params.token });
  res.status(200).json({ message: "Password reset succesfully, Please Log in." });
  }) ;
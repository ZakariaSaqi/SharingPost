const mongoose = require("mongoose")
const joi = require("joi")
const jwt = require("jsonwebtoken")
const passworComplexity = require("joi-password-complexity")
require("dotenv").config();
const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        trim : true,
    },
    email: {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
        trim : true,
    },
    profilePhoto : {
        type : Object,
        default:{
            url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicID : null
        }
    },
    isAdmin: {
        type: Boolean,
        default : false
    },
    isAccountVerified :{
        type: Boolean,
        default : false
    }

}, {
    timestamps : true,
    toJSON : { virtuals : true},
    toObject : { virtuals : true}
})
//populate posts that belongs to this user when get profile
UserSchema.virtual("posts", {
    ref : "Post",
    foreignField : "user",
    localField : "_id"
})
UserSchema.methods.generateAuthToken = function (){
return jwt.sign({id : this._id, isAdmin: this.isAdmin}, process.env.SECRET)
}
const User = mongoose.model("User", UserSchema)

function validateSignupUser(obj){
    const schema = joi.object({
        username:joi.string().trim().required(),
        email:joi.string().trim().required().email(),
        password:passworComplexity().required(),
    })
    return schema.validate(obj)
}
function validateLoginUser(obj){
    const schema = joi.object({
        email:joi.string().trim().required().email(),
        password:joi.string().trim().required(),
    })
    return schema.validate(obj)
}
function validateEmail(obj){
    const schema = joi.object({
        email:joi.string().trim().required().email(),
    })
    return schema.validate(obj)
}
function validateNewPassword(obj){
    const schema = joi.object({
        password:passworComplexity().required(),
    })
    return schema.validate(obj)
}
function validateUpdateUser(obj){
    const schema = joi.object({
        username: joi.string().trim(),
        email: joi.string().trim().email(),
        password:passworComplexity(),
    })
    return schema.validate(obj)
}
module.exports = {
    User,
    validateSignupUser,
    validateLoginUser,
    validateUpdateUser,
    validateNewPassword,
    validateEmail
}
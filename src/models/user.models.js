import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: "string",
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true,
        },
        email: {
            type: "string",
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        fullname: {
            type: "string",
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //Cloudinary URL
            required: true
        },
        coverImage: {
            type: String, //Cloudinary URL
        },
        watchHistory: [  // This means it will be an array of objects
            {
                type: Schema.Types.ObjectId,
                ref: "Video"     // Like User model
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"]  // This sets an error msg also , will be sent to frontend in case of fail
        },
        refreshToken: {
            type: String
        }
    }, 
    { timestamps: true } // Automatically adds createdAt and updatedAt
)

userSchema.pre("save", async function (next) {

    if(!this.modified("password")) return next()
    
    this.password = bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    // short lived access token
    return jwt.sign({
        _id: this._id,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema) 
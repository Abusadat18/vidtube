import mongoose, { Schema } from "mongoose";

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

export const User = mongoose.model("User", userSchema) 
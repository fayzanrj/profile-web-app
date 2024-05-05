/*
 ** User Model for mongoDB
 */

import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    name: String,
    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    },
    coverPic: {
      type: String,
    },
    profession: String,
    educationLevel: {
      type: String,
      enum: [
        "High School",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate Degree",
        "Other",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    phoneNumber: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

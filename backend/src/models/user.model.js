import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    profile: {
      fullName: {
        type: string,
        required: true,
      },
      userName: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
      },
    },
    email: {
      type: string,
      required: [true,"Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: string,
        required: [true, "Password is required"],
      minLength:[8,"Password must "]
    },
    role: {
      type: string,
        enum: ["user", "admin", "moderator"],
      default:'user'
    },
    refreshToken: {
      type: string,
    },
    createdPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Animal",
      },
    ],
    LikedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Animal",
      },
    ],
    readHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Animal",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Animal",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

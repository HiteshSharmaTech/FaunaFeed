import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
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
    email: {
      type: string,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: string,
      required: [true, "Password is required"],
      minLength: [8, "Password must "],
    },
    role: {
      type: string,
      enum: ["user", "admin", "moderator"],
      default: "user",
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_KEY }
  );
};

export const User = mongoose.model("User", userSchema);

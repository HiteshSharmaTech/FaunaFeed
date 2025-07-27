import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [{ type: String, required: true }],
    imageFile: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      index: true,
      unqiue: true,
    },
    likedByUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Animal = mongoose.model("Animal", animalSchema);

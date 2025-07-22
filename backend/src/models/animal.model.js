import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({}, { timestamps: true });

export const Animal = mongoose.model("Animal", animalSchema);

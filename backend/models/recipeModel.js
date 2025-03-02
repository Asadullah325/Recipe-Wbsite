import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
  time: { type: String },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
}, { timestamps: true });
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

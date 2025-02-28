import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  time: { type: String },
  image: { type: String },
});
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

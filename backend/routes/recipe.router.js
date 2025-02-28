import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/create", createRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

export default router;

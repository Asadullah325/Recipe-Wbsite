import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
  upload
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/create",upload.single("file"), createRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

export default router;

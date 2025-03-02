import Recipe from "../models/recipeModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

export const upload = multer({ storage: storage })

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
  }
};

export const createRecipe = async (req, res) => {
  try {

    const { name, ingredients, instructions, time } = req.body;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      time,
      image: req.file.filename,
      createdBy: req.user.id
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, instructions, time } = req.body;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    let image = req.file?.filename ? req.file.filename : recipe.image;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, instructions, time, image },
      { new: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted", recipe });
  } catch (error) {
    console.log(error.message);
  }
};

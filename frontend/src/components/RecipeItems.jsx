import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const RecipeItems = () => {
  const Recipes = useLoaderData() || [];
  const [favRecipes, setFavRecipes] = useState([]);

  const path = window.location.pathname === "/myrecipes";

  // Load favorite recipes from localStorage on mount
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourite")) || [];
    setFavRecipes(storedFavs);
  }, []);

  // Update localStorage whenever favRecipes changes
  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favRecipes));
  }, [favRecipes]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/recipes/delete/${id}`);

      // Update the list by filtering out the deleted recipe
      const updatedRecipes = Recipes.filter((recipe) => recipe._id !== id);

      // Remove from favorites if it exists
      setFavRecipes((prevFavs) =>
        prevFavs.filter((recipe) => recipe._id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
    }
  };

  const handleFavourite = (recipe) => {
    try {
      // Check if the recipe is already in favorites
      const isFavorite = favRecipes.some((item) => item._id === recipe._id);

      if (isFavorite) {
        // Remove from favorites
        setFavRecipes((prevFavs) =>
          prevFavs.filter((item) => item._id !== recipe._id)
        );
      } else {
        // Add to favorites
        setFavRecipes((prevFavs) => [...prevFavs, recipe]);
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error.message);
    }
  };


  // Memoized check for favorite recipes
  const isFavourite = useMemo(
    () => (recipeId) => favRecipes.some((item) => item._id === recipeId),
    [favRecipes]
  );

  return (
    <div className="container mx-auto mb-10">
      {Recipes.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600 mt-10">
          No recipes available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex flex-col border p-4 my-1 relative shadow-md cursor-pointer rounded-md bg-gray-300 hover:scale-103 transition-transform duration-500"
            >
              <img
                src={`http://localhost:3001/public/images/${recipe.image}`}
                alt={recipe.name}
                className="w-60 h-60 object-cover rounded-full mb-2 self-center"
              />
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
              <div className="flex items-center mb-2 space-x-2">
                <MdOutlineWatchLater className="inline-block" />
                <p>{recipe.time}</p>
              </div>
              <p className="mb-2">{recipe.ingredients}</p>
              <p className="mb-2">{recipe.instructions}</p>
              <div className="flex items-center space-x-2 justify-end absolute bottom-4 right-4 z-10">
                {!path ? (
                  <FaRegHeart
                    className="inline-block w-6 h-6 cursor-pointer"
                    onClick={() => handleFavourite(recipe)}
                    style={{
                      color: isFavourite(recipe._id) ? "red" : "black",
                    }}
                  />
                ) : (
                  <>
                    <Link to={`/editrecipe/${recipe._id}`}>
                      <FaEdit className="inline-block w-6 h-6 text-green-500 cursor-pointer" />
                    </Link>
                    <MdDelete
                      onClick={() => handleDelete(recipe._id)}
                      className="inline-block w-6 h-6 text-red-600 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeItems;

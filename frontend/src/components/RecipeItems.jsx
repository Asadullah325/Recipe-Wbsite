import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const RecipeItems = () => {
  const allRecipes = useLoaderData() || []; // Ensure it's an array
  const path = window.location.pathname === "/myrecipes";

  return (
    <div className="container mx-auto mb-10">
      {allRecipes.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600 mt-10">
          No recipes available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex flex-col border p-4 my-1 relative shadow-md cursor-pointer rounded-md bg-gray-300 hover:scale-103 transition-transform duration-500"
            >
              <img
                src={`http://localhost:3001/public/images/${recipe.image}`}
                alt={recipe.name}
                className="w-full h-50 object-cover rounded-md mb-2"
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
                  <FaRegHeart className="inline-block w-6 h-6" />
                ) : (
                  <>
                    <Link to={`/editrecipe/${recipe._id}`}>
                      {" "}
                      <FaEdit className="inline-block w-6 h-6 text-green-500 cursor-pointer" />
                    </Link>
                    <MdDelete className="inline-block w-6 h-6 text-red-600 cursor-pointer" />
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

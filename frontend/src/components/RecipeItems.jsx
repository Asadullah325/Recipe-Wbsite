import { useLoaderData } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const RecipeItems = () => {
  const allResipes = useLoaderData() || []; // Ensure it's an array

  return (
    <div className="container mx-auto mb-10">
      {allResipes.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600 mt-10">
          No recipes available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allResipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex flex-col border p-4 my-1 relative shadow-md cursor-pointer rounded-md bg-gray-300 hover:scale-103 transition-transform duration-500"
            >
              <img
                src="pizza.png"
                alt={recipe.name}
                className="w-[300px] mb-2 self-center"
              />
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
              <div className="flex items-center mb-2 space-x-2">
                <MdOutlineWatchLater className="inline-block" />
                <p>{recipe.time}</p>
              </div>
              <p className="mb-2">{recipe.ingredients}</p>
              <p className="mb-2">{recipe.instructions}</p>
              <div className="flex items-center space-x-2 justify-end absolute bottom-4 right-4 z-10">
                <FaRegHeart className="inline-block w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeItems;

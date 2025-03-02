import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const hadlechange = (e) => {
    let val =
      e.target.type === "ingredientd"
        ? e.target.value.split(",")
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/recipes/create", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-center">
          Add Your Recipe
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          {/* Name & Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="mb-1 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={hadlechange}
                className="w-full rounded border px-3 py-2 outline-none shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Enter recipe name"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="time" className="mb-1 font-medium">
                Time:
              </label>
              <input
                type="text"
                id="time"
                name="time"
                onChange={hadlechange}
                className="w-full rounded border px-3 py-2 outline-none shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Cooking time (e.g., 30 mins)"
              />
            </div>
          </div>

          {/* Ingredients & Instructions */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="ingredients" className="mb-1 font-medium">
                Ingredients:
              </label>
              <textarea
                id="ingredients"
                rows="3"
                name="ingredients"
                onChange={hadlechange}
                className="w-full rounded border px-3 py-2 outline-none shadow-sm focus:ring focus:ring-blue-300"
                placeholder="List ingredients..."
              />
            </div>
            <div className="w-full">
              <label htmlFor="instructions" className="mb-1 font-medium">
                Instructions:
              </label>
              <textarea
                id="instructions"
                rows="3"
                name="instructions"
                onChange={hadlechange}
                className="w-full rounded border px-3 py-2 shadow-sm focus:ring outline-none focus:ring-blue-300"
                placeholder="Write step-by-step instructions..."
              />
            </div>
          </div>

          {/* Image */}
          <div className="w-full flex flex-col">
            <label htmlFor="image" className="mb-1 font-medium">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="file"
              accept="image/*"
              onChange={hadlechange}
              className="w-full md:w-1/2 rounded border px-3 py-2 outline-none shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer shadow-md hover:bg-red-700 transition duration-300"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

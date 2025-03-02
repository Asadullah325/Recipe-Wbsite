import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddRecipe from "./pages/AddRecipe";

const getAllRecipes = async () => {
  let allRedipes = [];
  try {
    const response = await axios.get("http://localhost:3001/api/recipes");
    allRedipes = response.data;
    return allRedipes;
  } catch (error) {
    console.log(error);
  }
};

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => {
    console.log(user.id);
    return item.createdBy === user.id;
  });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path: "/myrecipes",
        element: <Home />,
        loader: getMyRecipes,
      },
      {
        path: "/favourites",
        element: <Home />,
      },
      {
        path: "/addrecipe",
        element: <AddRecipe />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

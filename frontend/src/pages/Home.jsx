import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeItems from "../components/RecipeItems";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className=" flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10">
          <div className="">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
              Food Recipes
            </h1>
            <p className="my-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
              totam iusto quia inventore sit, sint, nisi soluta nam eos
              molestiae ipsam eum repellendus, aliquid ut minima nulla impedit
              quis numquam.
            </p>
            <button className="px-5 py-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-md">
              Share Your Recipe
            </button>
          </div>
          <div className="my-5 md:my-0">
            <img src="pizza.png" alt="" className="w-[400px]" />
          </div>
        </div>
        <RecipeItems />
      </div>
    </>
  );
};

export default Home;

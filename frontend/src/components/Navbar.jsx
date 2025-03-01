import React, { useEffect, useState } from "react";
import Model from "./Model";
import InputForm from "./inputForm";
import { Link } from "react-router-dom";

const Navbar = () => {
  let token = localStorage.getItem("jwt");

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      setIsLogin(true); // Set to false after logout
    } else {
      setIsOpen(true); // Open the modal for login
    }
  };

  return (
    <>
      <nav className="bg-gray-800 text-white text-center py-5 flex justify-between items-center px-10">
        <h2>Recipe App</h2>
        <ul className="flex justify-between items-center space-x-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <Link to={!isLogin ? "/myrecipes" : "/"}>My Recipes</Link>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <Link to={!isLogin ? "/favourites" : "/"}>Favourites</Link>
          </li>
          <li className="cursor-pointer" onClick={checkLogin}>
            {isLogin ? "login" : "logout"}
          </li>
        </ul>
      </nav>
      {isOpen && (
        <Model onClose={() => setIsOpen(false)}>
          <InputForm
            setIsLogin={setIsLogin}
            setIsOpen={() => setIsOpen(false)}
          />
        </Model>
      )}
    </>
  );
};

export default Navbar;

import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="bg-gray-800 text-white text-center py-5 flex justify-between items-center px-10">
            <h2>Recipe App</h2>
            <ul className="flex justify-between items-center space-x-5">
                <li>Home</li>
                <li>Recipes</li>
                <li>Favourites</li>
                <li>Login</li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
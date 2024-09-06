import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from '../AuthContext';
import { useContext } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Accedi al contesto

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); // Chiamata alla funzione di logout dal contesto
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">¿DondeEstaLaBiblioteca?</div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white"
                : "text-white hover:text-gray-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Libreria"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white"
                : "text-white hover:text-gray-200"
            }
          >
            Your Library
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white"
                : "text-white hover:text-gray-200"
            }
          >
            About
          </NavLink>
          
          {/* Mostra il pulsante Logout se l'utente è autenticato, altrimenti mostra Accedi */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>

      {/* Menu a scomparsa per piccoli schermi */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-blue-600`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500"
              : "block px-4 py-2 text-white hover:bg-blue-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/libreria"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500"
              : "block px-4 py-2 text-white hover:bg-blue-500"
          }
        >
          Your Library
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500"
              : "block px-4 py-2 text-white hover:bg-blue-500"
          }
        >
          About
        </NavLink>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-white bg-red-500 hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <AuthModal />
        )}
      </div>
    </nav>
  );
}

export default Navbar;

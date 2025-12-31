import React, { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import PrivateRoute from "../privateRoute/PrivateRoute";
const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  return (
    <div className="navbar bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg border-b border-purple-500/20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-purple-500/20"
          >
            <li>
              <NavLink to="/" className="text-white hover:bg-purple-600/20">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allreviews"
                className="text-white hover:bg-purple-600/20"
              >
                All Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addreview"
                className="text-white hover:bg-purple-600/20"
              >
                Add Review
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myreviews"
                className="text-white hover:bg-purple-600/20"
              >
                My Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className="text-white hover:bg-purple-600/20"
              >
                Game Watch List
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink
          to="/"
          className="btn btn-ghost text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-purple-400 hover:from-purple-400 hover:to-amber-400 transition-all duration-300"
        >
          🎮 Game<span className="text-purple-400">Reviews</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:bg-purple-600/20 transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600/30 border-b-2 border-purple-400"
                    : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allreviews"
              className={({ isActive }) =>
                `text-white hover:bg-purple-600/20 transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600/30 border-b-2 border-purple-400"
                    : ""
                }`
              }
            >
              All Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addreview"
              className={({ isActive }) =>
                `text-white hover:bg-purple-600/20 transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600/30 border-b-2 border-purple-400"
                    : ""
                }`
              }
            >
              Add Review
            </NavLink>
          </li>
          <li>
            {user && (
              <NavLink
                to="/myreviews"
                className={({ isActive }) =>
                  `text-white hover:bg-purple-600/20 transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600/30 border-b-2 border-purple-400"
                      : ""
                  }`
                }
              >
                My Reviews
              </NavLink>
            )}
          </li>
          <li>
            {user && (
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `text-white hover:bg-purple-600/20 transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600/30 border-b-2 border-purple-400"
                      : ""
                  }`
                }
              >
                Game Watch List
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all duration-200"
            >
              <div className="w-10 rounded-full ring-2 ring-white/20">
                <img
                  alt="User Avatar"
                  src={user.photoURL}
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-purple-500/20"
            >
              <li>
                <NavLink
                  to="/profile"
                  className="text-white hover:bg-purple-600/20 justify-between"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-600/20"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-600 text-white border-none shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

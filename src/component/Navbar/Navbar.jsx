import React, { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaGamepad,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaList,
  FaPlus,
  FaBook,
  FaStar,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaPalette,
} from "react-icons/fa";

const TwoColorTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Update Tailwind dark mode class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group relative"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? (
          <FaSun className="text-amber-300 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <FaMoon className="text-blue-300 group-hover:rotate-180 transition-transform duration-500" />
        )}
        
        {/* Theme indicator dot */}
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${theme === "dark" ? "bg-amber-500" : "bg-blue-500"}`}></div>
      </button>
      
      {/* Theme dropdown for more options */}
      <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="p-3 space-y-2">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium px-2">
            Theme Options
          </div>
          <button
            onClick={() => {
              setTheme("dark");
              document.documentElement.setAttribute("data-theme", "dark");
              document.documentElement.classList.add("dark");
              localStorage.setItem("theme", "dark");
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${theme === "dark" ? "bg-purple-600/30 text-white" : "text-slate-300 hover:bg-slate-700/50"}`}
          >
            <div className="flex items-center gap-2">
              <FaMoon className="text-blue-400" />
              <span>Dark Mode</span>
            </div>
            {theme === "dark" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
          </button>
          <button
            onClick={() => {
              setTheme("light");
              document.documentElement.setAttribute("data-theme", "light");
              document.documentElement.classList.remove("dark");
              localStorage.setItem("theme", "light");
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${theme === "light" ? "bg-blue-600/30 text-white" : "text-slate-300 hover:bg-slate-700/50"}`}
          >
            <div className="flex items-center gap-2">
              <FaSun className="text-amber-400" />
              <span>Light Mode</span>
            </div>
            {theme === "light" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    {
      path: "/allreviews",
      label: "All Reviews",
      icon: <FaList className="mr-2" />,
    },
    {
      path: "/addreview",
      label: "Add Review",
      icon: <FaPlus className="mr-2" />,
    },
    ...(user
      ? [
          {
            path: "/myreviews",
            label: "My Reviews",
            icon: <FaBook className="mr-2" />,
          },
          {
            path: "/watchlist",
            label: "Watch List",
            icon: <FaStar className="mr-2" />,
          },
        ]
      : []),
  ];

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.email?.includes("admin") || false;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-900 via-purple-900/80 to-slate-900 backdrop-blur-lg border-b border-purple-500/30 shadow-xl shadow-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="shrink-0">
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-linear-to-r from-purple-600 to-amber-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <FaGamepad className="text-xl text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-linear-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                    GameReviews
                  </span>
                  <div className="text-xs text-purple-300/70">
                    Community Driven
                  </div>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition-all duration-200 flex items-center font-medium ${
                        isActive
                          ? "bg-linear-to-r from-purple-600/30 to-amber-500/30 text-white shadow-lg shadow-purple-500/20"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center gap-4">

              {user ? (
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {/* {user.displayName?.split(" ")[0] || "User"} */}
                        {isAdmin && (
                          <span className="p-2 bg-linear-to-r from-red-600 to-pink-600 text-xs rounded-full">
                            ADMIN
                          </span>
                        )}
                      </div>
                      {/* <div className="text-xs text-slate-400">
                        {user.email?.split("@")[0]}
                      </div> */}
                    </div>
                    
                    {/* User Avatar with Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="avatar rounded-lg hover:ring-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
                            <img
                              alt="User Avatar"
                              src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${
                                  user.displayName || "User"
                                }&background=8b5cf6&color=fff`
                              }
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${
                                  user.displayName || "User"
                                }&background=8b5cf6&color=fff`;
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:hidden text-left">
                          <div className="text-sm font-medium text-white">
                            {user.displayName?.split(" ")[0] || "User"}
                          </div>
                          <div className="text-xs text-slate-400">
                            {user.email?.split("@")[0]}
                          </div>
                        </div>
                      </button>

                      {/* User Dropdown */}
                      {userDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-lg rounded-xl border border-slate-700 shadow-2xl z-50">
                          <div className="p-2">
                            {/* User Info */}
                            <div className="px-3 py-3 border-b border-slate-700/50">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50">
                                  <img
                                    alt="User Avatar"
                                    src={
                                      user.photoURL ||
                                      `https://ui-avatars.com/api/?name=${
                                        user.displayName || "User"
                                      }&background=8b5cf6&color=fff`
                                    }
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-white">
                                    {user.displayName || "User"}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                              <NavLink
                                to="/profile"
                                className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-colors"
                                onClick={() => {
                                  setUserDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                <FaUser className="text-purple-400" />
                                My Profile
                              </NavLink>
                              
                              {isAdmin && (
                                <NavLink
                                  to="/admin"
                                  className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-red-600/30 rounded-lg transition-colors"
                                  onClick={() => {
                                    setUserDropdownOpen(false);
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  <FaPalette className="text-red-400" />
                                  Admin Dashboard
                                </NavLink>
                              )}

                              <div className="my-1 px-3">
                                <div className="h-px bg-slate-700/50"></div>
                              </div>

                              <div className="px-3 py-2 flex items-center justify-between">
                                <div className="text-xs text-slate-100 mb-2">
                                  Theme
                                </div>
                                <TwoColorTheme />
                              </div>

                              <div className="my-1 px-3">
                                <div className="h-px bg-slate-700/50"></div>
                              </div>

                              <button
                                onClick={handleLogoutClick}
                                className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-colors"
                              >
                                <FaSignOutAlt />
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="hidden md:inline-flex items-center px-6 py-2 bg-linear-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Login
                </NavLink>
              )}

              {/* Mobile Theme Toggle */}
              <div className="md:hidden">
                <TwoColorTheme />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-lg border-t border-purple-500/20">
            {user && (
              <div className="px-4 py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50">
                    <img
                      alt="User Avatar"
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${
                          user.displayName || "User"
                        }&background=8b5cf6&color=fff`
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {user.displayName || "User"}
                    </div>
                    <div className="text-sm text-slate-400">
                      {user.email?.split("@")[0]}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-all duration-200 items-center ${
                    isActive
                      ? "bg-linear-to-r from-purple-600/30 to-amber-500/30 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`
                }
                onClick={closeMobileMenu}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            {user && (
              <>
                <div className="px-4 py-2">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Account
                  </div>
                </div>
                <NavLink
                  to="/profile"
                  className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 items-center"
                  onClick={closeMobileMenu}
                >
                  <FaUser className="mr-2" />
                  My Profile
                </NavLink>
                
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    className=" px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-red-600/30 transition-all duration-200 flex items-center"
                    onClick={closeMobileMenu}
                  >
                    <FaPalette className="mr-2 text-red-400" />
                    Admin Dashboard
                  </NavLink>
                )}

                <div className="px-4 py-2">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Appearance
                  </div>
                </div>
                <div className="px-4 py-3">
                  <TwoColorTheme />
                </div>

                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all duration-200 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            )}

            {!user && (
              <NavLink
                to="/login"
                className="block px-4 py-3 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold text-center hover:from-purple-500 hover:to-amber-600 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                Login to Continue
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar;
import React, { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGamepad, FaUser, FaSignOutAlt, FaHome, FaList, FaPlus, FaBook, FaStar, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    { path: "/allreviews", label: "All Reviews", icon: <FaList className="mr-2" /> },
    { path: "/addreview", label: "Add Review", icon: <FaPlus className="mr-2" /> },
    ...(user ? [
      { path: "/myreviews", label: "My Reviews", icon: <FaBook className="mr-2" /> },
      { path: "/watchlist", label: "Watch List", icon: <FaStar className="mr-2" /> }
    ] : [])
  ];

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900/80 to-slate-900 backdrop-blur-lg border-b border-purple-500/30 shadow-xl shadow-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <FaGamepad className="text-xl text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                    GameReviews
                  </span>
                  <div className="text-xs text-purple-300/70">Community Driven</div>
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
                          ? "bg-gradient-to-r from-purple-600/30 to-amber-500/30 text-white shadow-lg shadow-purple-500/20"
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
                <div className="relative group">
                  <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-white">
                        {user.displayName?.split(' ')[0] || 'User'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {user.email?.split('@')[0]}
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="avatar ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
                          <img
                            alt="User Avatar"
                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=8b5cf6&color=fff`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=8b5cf6&color=fff`;
                            }}
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-lg bg-slate-800/95 backdrop-blur-lg rounded-box w-52 mt-2 border border-purple-500/20"
                      >
                        <li>
                          <NavLink
                            to="/profile"
                            className="text-slate-300 hover:text-white hover:bg-purple-600/30 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <FaUser className="text-purple-400" />
                            Profile
                          </NavLink>
                        </li>
                        <div className="divider my-1"></div>
                        <li>
                          <button
                            onClick={handleLogoutClick}
                            className="text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-colors"
                          >
                            <FaSignOutAlt />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="hidden md:inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Login
                </NavLink>
              )}

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
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-lg border-t border-purple-500/20">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/30 to-amber-500/30 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`
                }
                onClick={closeMobileMenu}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            
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
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { UserContext } from "../../contexts/UserContext";
import NotificationBell from "../notification/NotificationBell";
import logo from "/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo or title */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className="text-xl font-bold text-gray-800"
                onClick={handleNavLinkClick}
              >
                <img className="w-36" src={logo} alt="logo" />
              </NavLink>
              {user && (
                <span className="text-gray-800 font-medium">
                  Welcome, {user.name}
                </span>
              )}
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center text-xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              Events
            </NavLink>

            {/* Conditionally render based on user role */}
            {user && !user.isAdmin && (
              <>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  My Events
                </NavLink>

                <NavLink
                  to="/my-wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  My Wishlist
                </NavLink>
              </>
            )}

            {user && user.isAdmin && (
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-bold"
                    : "text-gray-800 hover:text-gray-600"
                }
                onClick={handleNavLinkClick}
              >
                Dashboard
              </NavLink>
            )}

            {/* Notification Bell Icon */}
            {user && !user.isAdmin && <NotificationBell />}

            {/* Show Logout if user is logged in */}
            {user ? (
              <button
                onClick={logout}
                className="text-gray-800 hover:text-gray-600"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? (
                <ImCancelCircle className="h-6 w-6" />
              ) : (
                <CiMenuFries className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block text-blue-500 px-4 py-2"
                : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "block text-blue-500 px-4 py-2"
                : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick}
          >
            Events
          </NavLink>

          {user && !user.isAdmin && (
            <>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-500 px-4 py-2"
                    : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick}
              >
                About Us
              </NavLink>

              <NavLink
                to="/my-events"
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-500 px-4 py-2"
                    : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick}
              >
                My Events
              </NavLink>

              {/* My Wishlist link */}
              <NavLink
                to="/my-wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-500 px-4 py-2"
                    : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick}
              >
                My Wishlist
              </NavLink>

              {/* Notification Bell */}
              <div className="px-4 py-2">
                <NotificationBell />
              </div>
            </>
          )}

          {user && user.isAdmin && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 px-4 py-2"
                  : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={logout}
              className="block text-gray-800 px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-500 px-4 py-2"
                    : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick}
              >
                Sign In
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-500 px-4 py-2"
                    : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

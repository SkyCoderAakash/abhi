import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../common/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const authButtons = [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 h-16">
      <nav className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BikeMarket
        </Link>
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              {authButtons.map((btn) => (
                <Link key={btn.label} to={btn.to}>
                  <Button>{btn.label}</Button>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-4">
          <ul className="space-y-2 pt-2 border-t">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="pt-2 border-t">
              <span className="block text-gray-700 mb-3">
                Welcome, {user.name}
              </span>

              <Button
                variant="danger"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="pt-2 border-t space-y-3">
              {authButtons.map((btn) => (
                <Link
                  key={btn.label}
                  to={btn.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full">{btn.label}</Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

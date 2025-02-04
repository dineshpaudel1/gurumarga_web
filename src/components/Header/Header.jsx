import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCaretDown,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import UserContext from "../context/UserInfoProvider";
import { fetchCategories, fetchCategoryById } from "../Apis/CategoryApi";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const [userInfo, fetchUserInfo, role] = useContext(UserContext);
  localStorage.setItem("role", role);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) handleLogout();

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const totalItems = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      setCartCount(totalItems);
    }
  }, []);

  const updateCartCount = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const totalItems = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      setCartCount(totalItems);
    }
    window.location.reload();
  };

  const handleCategoryClick = (categoryId) => {
    fetchCategoryById(categoryId)
      .then((category) => {
        navigate(`/categories/${categoryId}`, { state: { category } });
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUsername(null);
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  const toggleCategoryDropdown = () =>
    setCategoryDropdownOpen(!categoryDropdownOpen);
  const closeCategoryDropdown = () => setCategoryDropdownOpen(false);

  return (
    <header className="bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-[60px]" />
              </Link>

              <div className="relative">
                <button
                  onClick={toggleCategoryDropdown}
                  className="text-[#1a237e] hover:text-gray-800 flex items-center focus:outline-none"
                >
                  Categories
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md py-2 px-4 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
          />

          <FontAwesomeIcon
            icon={faBell}
            className="text-xl text-gray-600 cursor-pointer hover:text-indigo-500"
          />

          <Link to="/cart" className="relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="ml-2 text-xl cursor-pointer"
            />
            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-1 py-0.3">
              {cartCount}
            </span>
          </Link>

          {(role === "ROLE_USER" || !role) && (
            <Link to="/becometeacher" className="ml-4 text-[#1a237e]">
              Become Teacher
            </Link>
          )}

          {username ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center text-lg py-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                  onMouseLeave={closeDropdown}
                >
                  {role === "ROLE_ADMIN" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={closeDropdown}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {role === "ROLE_USER" && (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={closeDropdown}
                      >
                        Profile
                      </Link>
                      <Link
                        to="mycourse"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={closeDropdown}
                      >
                        My Courses
                      </Link>
                    </>
                  )}
                  {role === "ROLE_TEACHER" && (
                    <Link
                      to="teacher"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={closeDropdown}
                    >
                      Teacher Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const { navigate, token, setToken, educatorToken, setEducatorToken } =
    useContext(StoreContext);

  // ================= Logout Student =================
  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Student logged out");
    navigate("/");
  };

  // ================= Logout Educator =================
  const logoutEducator = () => {
    setEducatorToken("");
    localStorage.removeItem("educatorToken");
    toast.success("Educator logged out");
    navigate("/");
  };

  // ================= Auth Button Logic =================
  const renderAuthButton = () => {
    if (token) {
      return (
        <p onClick={logoutUser} className="navbar-section-buttons-section-btn">
          Logout (Student)
        </p>
      );
    }

    if (educatorToken) {
      return (
        <p
          onClick={logoutEducator}
          className="navbar-section-buttons-section-btn"
        >
          Logout (Educator)
        </p>
      );
    }

    return (
      <p
        onClick={() => navigate("/interim")}
        className="navbar-section-buttons-section-btn"
      >
        Login / Registration
      </p>
    );
  };

  const renderShopToken = () => {
    if (token) {
     retrun (
      <button
        onClick={() => navigate("/cart-details")}
        className="navbar-section-buttons-section-btn"
      >
        SHOP
      </button>
     )
    } else {
      return null;
    }
  }

  // ================= STUDENT LINKS (Hidden for educators) =================
  const renderStudentLinks = () => {
    if (educatorToken) return null;

    return (
      <div className="navbar-dropdown-features">
        <button className="navbar-section-buttons-section-btn">STUDENTS</button>
        <ul className="navbar-dropdown-menu-features">
          <li onClick={() => navigate("/students-list")}>Student's Team</li>
          <li onClick={() => navigate("/teachers-personal-pages")}>
            Student Personal Page
          </li>
        </ul>
      </div>
    );
  };

  // ================= COURSES LINKS =================
  const renderCoursesLink = () => {
    return (
      <li
        onClick={() =>
          navigate(educatorToken ? "/educator-dashboard" : "/courses-menu")
        }
      >
        {educatorToken ? "LearnDash LMS" : "Courses Menu"}
      </li>
    );
  };

  const myOrders = () => {
    if (token) {
      return <li onClick={() => navigate("/orders")}>Order history</li>
    }
  }

  return (
    <div className="navbar-section-div">
      <div className="navbar-section-div-full">
        <div className="navbar-section">
          {/* Logo */}
          <div className="navbar-section-h1-div">
            <h1 onClick={() => navigate("/")} className="navbar-section-h1">
              Education Center.
            </h1>
          </div>

          <div onClick={() => setShowNavbar(prev => !prev)} className="listings-btn">
            <img className="listings-btn-button" src={assets.listings} alt="assets.png" />
          </div>

          {/* Navigation Links */}
          {showNavbar && (
            <div className="navbar-section-buttons-section">
              {/* FEATURES */}
              <div className="navbar-dropdown-features">
                <button className="navbar-section-buttons-section-btn">FEATURES</button>
                <ul className="navbar-dropdown-menu-features">
                  <li onClick={() => navigate("/about-us")}>About Us</li>
                  <li onClick={() => navigate("/contact")}>Contact Us</li>
                  {myOrders()};
                </ul>
              </div>

              {/* COURSES */}
              <div className="navbar-dropdown-features">
                <button className="navbar-section-buttons-section-btn">COURSES</button>
                <ul className="navbar-dropdown-menu-features">{renderCoursesLink()}</ul>
              </div>

              {/* STUDENTS */}
              {renderStudentLinks()}

              {/* BLOG */}

              {/* ✅ Auth Button */}
              {renderAuthButton()}

              {/* SHOP */}
              {renderShopToken()}
            </div>)}
          {/* Search */}
          <div className="navbar-section-image-section">
            <img
              onClick={() => setIsSearched(true)}
              className="navbar-section-image-section-img"
              src={assets.search}
              alt="search"
            />

            {isSearched && (
              <div className="navbar-section-image-section-input-full">
                <input
                  className="navbar-section-image-section-input"
                  type="text"
                  placeholder="Search..."
                  autoFocus
                />
                <span
                  className="navbar-section-image-section-input-p"
                  onClick={() => setIsSearched(false)}
                >
                  ✕
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

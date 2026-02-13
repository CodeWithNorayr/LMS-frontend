import React, { useContext, useEffect, useState } from "react";
import "./CoursesMenu.css";
import { StoreContext } from "../../context/StoreContext";
import { searchTitles, assets } from "../../assets/assets";

const CoursesMenu = () => {
  const {
    courseSchemas,
    navigate,
    cartItems,
    addToCart,
    removeFromCart,
    backendURL,
    filteredCourses,
    setFilteredCourses,
  } = useContext(StoreContext);

  // ✅ Selected checkbox titles
  const [searchTitle, setSearchTitle] = useState([]);

  // Show/hide sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Loading skeleton
  const [loading, setLoading] = useState(true);

  const coursesPerPage = 6;

  // ✅ Checkbox handler
  const onSearchTitle = (title) => {
    setSearchTitle((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // ✅ Filtering logic
  useEffect(() => {
    setLoading(true);

    const filtered = courseSchemas
      .slice()
      .reverse()
      .filter((course) => {
        if (searchTitle.length === 0) return true;
        return searchTitle.some((title) =>
          course.courseTitle.toLowerCase().includes(title.toLowerCase())
        );
      });

    setFilteredCourses(filtered);
    setCurrentPage(1);

    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchTitle, courseSchemas, setFilteredCourses]);

  // ✅ Pagination calculations
  const totalPages = Math.ceil((filteredCourses?.length || 0) / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses?.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  return (
    <section className="courses-menu">
      {/* ================= FILTER ================= */}
      <aside className="courses-filter">
        <div className="filter-title-div">
          <h3
            className="filter-title"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            Search by title {showSidebar ? "▲" : "▼"}
          </h3>
        </div>

        {showSidebar && (
          <div className="filter-options">
            {searchTitles.map((title) => (
              <label key={title} className="filter-option">
                <input
                  type="checkbox"
                  checked={searchTitle.includes(title)}
                  onChange={() => onSearchTitle(title)}
                />
                <p className="filter-options-p"><span>{title}</span></p>
              </label>
            ))}
          </div>
        )}
      </aside>

      {/* ================= COURSES GRID ================= */}
      <section className="courses-grid">
        {loading
          ? Array.from({ length: coursesPerPage }).map((_, index) => (
              <div className="course-card skeleton" key={index}>
                <div className="skeleton-thumbnail"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-text long"></div>
                <div className="skeleton-text price"></div>
                <div className="skeleton-button"></div>
              </div>
            ))
          : currentCourses?.map((course) => (
              <article className="course-card" key={course._id}>
                <img
                  src={`${course.image}`}
                  alt={course.courseTitle}
                  className="course-thumbnail"
                  onClick={() =>
                    navigate(`/upcoming-course-details/${course._id}`)
                  }
                />

                <div className="course-content">
                  <h2 className="course-title">{course.courseTitle}</h2>
                  <p className="course-description">{course.courseDescription}</p>
                  <h3 className="course-price">${course.coursePrice}</h3>

                  <div className="course-actions">
                    {!cartItems[course._id] ? (
                      <button className="cart-controls-button" onClick={() => addToCart(course._id)}>Add to cart</button>
                    ) : (
                      <div className="cart-controls">
                        <button className="cart-controls-button-1" onClick={() => removeFromCart(course._id)}>−</button>
                        <span>{cartItems[course._id]}</span>
                        <button className="cart-controls-button-2" onClick={() => addToCart(course._id)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
      </section>

      {/* ================= PAGINATION ================= */}
      {!loading && totalPages > 1 && (
        <nav className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <img src={assets.left} alt="Previous" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <img src={assets.right} alt="Next" />
          </button>
        </nav>
      )}
    </section>
  );
};

export default CoursesMenu;

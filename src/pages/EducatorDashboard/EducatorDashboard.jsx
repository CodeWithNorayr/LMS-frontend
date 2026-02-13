import React, { useContext } from "react";
import "./EducatorDashboard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const EducatorDashboard = () => {
  const { navigate } = useContext(StoreContext);

  return (
    <div className="educator-dash-adding-form-section">
      
      {/* Title */}
      <div>
        <h1 className="educator-dash-img-h1-section-p">Edu Dash</h1>
      </div>

      {/* Add Lecture */}
      <div
        onClick={() => navigate("/add-lecture")}
        className="educator-dash-img-adding-section"
      >
        <img
          className="educator-dash-img-add"
          src={assets.adding}
          alt="adding"
        />
        <p className="educator-dash-img-adding-section-p">
          Add Lecture
        </p>
      </div>

      {/* Lectures */}
      <div
        onClick={() => navigate("/lectures")}
        className="educator-dash-img-viewapplication-section"
      >
        <img
          className="educator-dash-img-viewapplication-image-section"
          src={assets.videoLessons}
          alt="lectures"
        />
        <p className="educator-dash-img-lectures-section-p">
          Lectures
        </p>
      </div>

      {/* Manage Lectures */}
      <div
        onClick={() => navigate("/manage-lectures")}
        className="educator-dash-img-upcoming-section"
      >
        <img
          className="educator-dash-img-upcoming-section-image"
          src={assets.management1}
          alt="manage"
        />
        <p className="educator-dash-img-upcoming-section-p">
          Manage Lectures
        </p>
      </div>

      <div
        onClick={() => navigate("/manage-lectures")}
        className="educator-dash-img-teachers-section"
      >
        <img
          className="educator-dash-img-teachers-section-image"
          src={assets.myOwnCourses}
          alt="my courses"
        />
        <p className="educator-dash-img-teachers-section-p">
          Manage courses
        </p>
      </div>

      {/* Teachers */}
      <div
        onClick={() => navigate("/teachers")}
        className="educator-dash-img-teachers-section"
      >
        <img
          className="educator-dash-img-teachers-section-image"
          src={assets.classRoom}
          alt="teachers"
        />
        <p className="educator-dash-img-teachers-section-p">
          Teachers
        </p>
      </div>

      {/* Students */}
      <div
        onClick={() => navigate("/students")}
        className="educator-dash-img-students-section"
      >
        <img
          className="educator-dash-img-students-section-image"
          src={assets.students}
          alt="students"
        />
        <p className="educator-dash-img-students-section-p">
          Students
        </p>
      </div>

    </div>
  );
};

export default EducatorDashboard;

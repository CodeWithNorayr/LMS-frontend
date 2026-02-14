import React, { useContext, useEffect, useState } from "react";
import "./CourseDetails.css";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { navigate, backendURL, educatorToken } = useContext(StoreContext);

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openChapterId, setOpenChapterId] = useState(
    localStorage.getItem("openChapterId") || null
  );

  // ✅ Fetch course details directly from backend (Best Practice)
  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${backendURL}/api/course/course/${id}`
        );

        if (response.data.data) {
          setCourse(response.data.data);
        } else {
          toast.error("Course not found");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseById();
  }, [id, backendURL]);

  // ✅ Toggle chapter + store in localStorage properly
  const toggleChapter = (chapterId) => {
    const newId = openChapterId === chapterId ? null : chapterId;
    setOpenChapterId(newId);

    if (newId) {
      localStorage.setItem("openChapterId", newId);
    } else {
      localStorage.removeItem("openChapterId");
    }
  };

  // ✅ Delete course
  const deleteCourse = async () => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${educatorToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Course deleted successfully");
        navigate("/educator-dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the course");
    }
  };

  // ✅ Loading state
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading course details...</p>;
  }

  // ✅ Course not found state
  if (!course) {
    return <p style={{ padding: "20px" }}>Course not found.</p>;
  }

  return (
    <div className="course-details-container">
      <div className="course-details-container-h2-div">
        <h2 className="course-details-container-h2">Course Details</h2>
      </div>

      <div className="course-details-card-full">
        <div className="course-details-card">
          {/* ✅ Course Image */}
          <div className="course-image-section">
            <img
              src={course.image}
              alt={course.courseTitle}
              className="course-image"
            />
          </div>

          {/* ✅ Course Info */}
          <div className="course-info-section">
            <h3 className="course-info-section-h3">
              Educator: {course.educator?.name || "Unknown Educator"}
            </h3>

            <h3 className="course-info-section-h3">{course.courseTitle}</h3>

            <p className="course-info-section-p">
              {course.courseDescription}
            </p>

            <h4 className="course-info-section-h4">
              Price: ${course.coursePrice}
            </h4>

            <h4 className="course-info-section-h4">
              Discount: ${course.discount}
            </h4>
          </div>

          {/* ✅ Chapters & Lectures */}
          <div className="course-chapters-section">
            <h3 className="course-info-section-h3">
              Chapters & Lectures
            </h3>

            {course.courseContent?.map((chapter) => (
              <div key={chapter.chapterId} className="chapter-card">
                <h4
                  className="course-info-section-h4"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleChapter(chapter.chapterId)}
                >
                  Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
                </h4>

                {/* Lectures */}
                {openChapterId === chapter.chapterId && (
                  <div>
                    {chapter.chapterContent?.map((lecture) => (
                      <div key={lecture.lectureId} className="lecture-card">
                        <p className="course-info-section-p">
                          Lecture {lecture.lectureOrder}: {lecture.lectureTitle}{" "}
                          ({lecture.lectureDuration} min)
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="button-section-div-sec">
        <button
          onClick={() => navigate(`/course-update/${course._id}`)}
          className="button-section-div-sec-update"
        >
          Update
        </button>

        <button
          onClick={deleteCourse}
          className="button-section-div-sec-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;

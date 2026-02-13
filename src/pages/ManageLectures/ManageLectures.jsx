import React, { useContext, useEffect, useState } from "react";
import "./ManageLectures.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const ManageLectures = () => {
  const { navigate, backendURL, educatorToken } = useContext(StoreContext);
  const [courseData, setCourseData] = useState([]);
  const [openChapterId, setOpenChapterId] = useState(
    localStorage.getItem("openChapterId") || null
  );

  // Fetch all courses
  const fetchingCourses = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/courses/getAllCourses`, {
        headers: {
          Authorization: `Bearer ${educatorToken}`,
        },
      });
      if (response.data.data) {
        setCourseData(response.data.data);
      }
    } catch (error) {
      toast.error("Fetching courses failed");
      console.log(error);
    }
  };

  useEffect(() => {
    if (educatorToken) {
      fetchingCourses();
    }
  }, [educatorToken]);

  // Toggle chapter
  const toggleChapter = (chapterId) => {
    const newId = openChapterId === chapterId ? null : chapterId;
    setOpenChapterId(newId);
    localStorage.setItem("openChapterId", newId);
  };

  return (
    <div className="manage-lectures-container">
      <h1 className="manage-lectures-container-h1">Manage Lectures</h1>

      {courseData.length === 0 && <p>No courses found.</p>}
      <div className="managing-course-content">
        {courseData.map(
          (course) =>
            course.isPublished && (
              <div className="course-card" key={course._id}>
                <div className="course-header">
                  <img
                    src={`${course.image}`}
                    alt={course.courseTitle}
                    className="course-image"
                  />
                  <div className="course-info">
                    <h3 className="course-info-h333333">{course.courseTitle}</h3>
                    <p className="course-info-pppppp">{course.courseDescription}</p>
                    <h4 className="course-info-h4444444">
                      Price: ${course.coursePrice} | Discount: -${course.discount}
                    </h4>
                  </div>
                </div>

                {/* Chapters */}
                {course.courseContent?.map((chapter) => (
                  <div className="chapter-section" key={chapter.chapterId}>
                    <h4
                      className="chapter-section-h444"
                      onClick={() => toggleChapter(chapter.chapterId)}
                      style={{ cursor: "pointer" }}
                    >
                      Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
                    </h4>

                    {/* Lectures */}
                    {openChapterId === chapter.chapterId && (
                      <div className="lectures-list">
                        {chapter.chapterContent?.map((lecture) => (
                          <div className="lecture-item" key={lecture.lectureId}>
                            <p className="lecture-item-ppp">
                              Lecture {lecture.lectureOrder}: {lecture.lectureTitle} (
                              {lecture.lectureDuration} min)
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="btn-section-button">
                      <button onClick={()=>navigate(`/course-details/${course._id}`)} className="btn-section-button-update" type="button">Manage course</button>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ManageLectures

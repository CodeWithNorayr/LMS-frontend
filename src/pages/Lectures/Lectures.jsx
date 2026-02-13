import React, { useContext, useEffect, useState } from "react";
import "./Lectures.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Lectures = () => {
  const { backendURL } = useContext(StoreContext);

  const [courseData, setCourseData] = useState([]);

  // Store open chapter
  const [openChapterId, setOpenChapterId] = useState(null);

  // Toggle chapter open/close
  const toggleChapter = (chapterId) => {
    setOpenChapterId((prev) => (prev === chapterId ? null : chapterId));
  };

  // Fetch courses
  const fetchingCourses = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/courses/getAllCourses`
      );

      if (response.data.success) {
        setCourseData(response.data.data);
      }
    } catch (error) {
      toast.error("Fetching courses failed");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingCourses();
  }, []);

  return (
    <div className="lectures-page">
      <div>
        <h1 className="lectures-page-title">Lectures</h1>
      </div>
      <div className="course-box-full-section-div">
        {courseData.map((course) => (
          <div className="course-box-full-section">
            <div className="course-box">
              <div className="course-box-sec" key={course._id}>
                {/* COURSE HEADER */}
                <div className="course-header">
                  <img
                    src={`${course.image}`}
                    alt={course.courseTitle}
                    className="course-image"
                  />

                  <div className="course-info">
                    <h3 className="course-info-h3333333">{course.courseTitle}</h3>
                    <p className="course-info-ppppppppp">{course.courseDescription}</p>

                    <div className="price-section">
                      <h2 className="price-section-h222222222222">${course.coursePrice}</h2>
                      <h2 className="price-section-h22222222">-{course.discount}% discount</h2>
                    </div>
                  </div>
                </div>

                {/* CHAPTERS */}
                <div className="chapters-section">
                  {course.courseContent?.map((chapter) => (
                    <div className="chapter-box" key={chapter.chapterId}>
                      {/* CLICK TO TOGGLE */}
                      <h3
                        className="chapter-title"
                        onClick={() => toggleChapter(chapter.chapterId)}
                      >
                        Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
                      </h3>

                      {/* SHOW LECTURES ONLY IF OPEN */}
                      {openChapterId === chapter.chapterId && (
                        <div className="lectures-section">
                          {chapter.chapterContent?.map((lecture) => (
                            <div className="lecture-box" key={lecture.lectureId}>
                              <h4 className="lecture-box-h4">
                                Lecture {lecture.lectureOrder}: {lecture.lectureTitle}
                              </h4>

                              <p className="lecture-box-h4">Duration: {lecture.lectureDuration}</p>

                              {lecture.lectureUrl && (
                                <a
                                  href={lecture.lectureUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="lecture-box-h4"
                                >
                                  Watch Lecture
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;

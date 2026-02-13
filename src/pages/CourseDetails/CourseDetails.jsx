import React, { useContext, useEffect, useState } from 'react';
import "./CourseDetails.css";
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { navigate, backendURL, courseSchemas, educatorToken } = useContext(StoreContext);
  const [openChapterId, setOpenChapterId] = useState(
    localStorage.getItem("openChapterId") || null
  );
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!courseSchemas || courseSchemas.length === 0) return;

    const foundCourse = courseSchemas.find((c) => c._id === id);

    setCourse(foundCourse);
    
  }, [courseSchemas, id]);

  const toggleChapter = (chapterId) => {
    setOpenChapterId(openChapterId === chapterId ? null : chapterId);
  }

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/api/course/delete/${id}`,{
        headers:{
          "Authorization":`Bearer ${educatorToken}`
        }
      });
      if ( response.data.success ) {
        toast.success("Course is deleted");
        navigate("/educator-dashboard");
      };
    } catch (error) {
      toast.error("Failed to delete the course");
    };
  };

  // If course not found yet
  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="course-details-container">
      <div className="course-details-container-h2-div">
        <h2 className="course-details-container-h2">Course Details</h2>
      </div>
      <div className="course-details-card-full">
      <div className="course-details-card">
        <div className="course-details-card">
          <div className="course-image-section">
            <img
              src={`${course.image}`}
              alt={course.courseTitle}
              className="course-image"
            />
          </div>

          <div className="course-info-section">
            <h3 className="course-info-section-h3">{course.educator.name}</h3>
            <h3 className="course-info-section-h3">{course.courseTitle}</h3>
            <p className="course-info-section-p">{course.courseDescription}</p>
            <h4 className="course-info-section-h4">Price: ${course.coursePrice}</h4>
            <h4 className="course-info-section-h4">Discount: ${course.discount}</h4>
          </div>
        </div>

        <div className="course-chapters-section">
          <h3 className="course-info-section-h3">Chapters & Lectures</h3>
          {course.courseContent?.map((chapter) => (
            <div key={chapter.chapterId} className="chapter-card">
              <h4 className="course-info-section-h4" onClick={() => toggleChapter(chapter.chapterId)}>
                Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
              </h4>

              {openChapterId === chapter.chapterId &&
                (
                  <div>
                    {chapter.chapterContent?.map((lecture) => (
                      <div key={lecture.lectureId} className="lecture-card">
                        <p className="course-info-section-p">
                          Lecture {lecture.lectureOrder}: {lecture.lectureTitle} (
                          {lecture.lectureDuration} min)
                        </p>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className='button-section-div-sec'>
        <button onClick={()=>navigate(`/course-update/${course._id}`)} className='button-section-div-sec-update'>Update</button>
        <button onClick={()=>deleteCourse(course._id)} className='button-section-div-sec-delete'>Delete</button>
      </div> 
    </div>
  );
};

export default CourseDetails;

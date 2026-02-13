import React, { useContext, useEffect, useState } from "react";
import "./MyOwnCourses.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const MyOwnCourses = () => {
  const { backendURL, educatorToken } = useContext(StoreContext);

  // ✅ Get courseId from URL
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);

  // ================= Fetch Course By ID =================
  const fetchingCourseData = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/course/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${educatorToken}`,
          },
        }
      );

      if (response.data.success) {
        setCourseData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch course data");
      console.log(error);
    }
  };

  // ================= Run when token + courseId exist =================
  useEffect(() => {
    if (educatorToken && courseId) {
      fetchingCourseData();
    }
  }, [educatorToken, courseId]);

  // ================= UI =================
  if (!courseData) return <p>No course data found</p>;

  return (
    <div>
      <h3>My Own Course</h3>
      <h2>{courseData.courseTitle}</h2>
      <p>{courseData.courseDescription}</p>
    </div>
  );
};

export default MyOwnCourses;

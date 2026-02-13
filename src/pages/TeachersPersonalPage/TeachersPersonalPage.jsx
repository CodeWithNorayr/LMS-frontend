import React, { useContext, useEffect, useState } from "react";
import "./TeachersPersonalPage.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const TeachersPersonalPage = () => {
  const { backendURL, token, navigate, setToken } = useContext(StoreContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user data
  const fetchTeacherPersonalData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run only when token exists
  useEffect(() => {
    if (token) {
      fetchTeacherPersonalData();
    }
  }, [token]);

  const deleteStudent = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/user/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.data.success) {
        toast.success("Account is successfully deleted");
        setToken("");
        navigate("/student-registration");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Deleting profile is failed");
    }
  }

  const affirmDeleting = () => {
    window.confirm("Do you really want to delete your account ?")
    deleteStudent();
  }

  // ✅ Loading state
  if (loading) return <p>Loading...</p>;

  // ✅ No data state
  if (!data) return <p>No user data available.</p>;

  return (
    <div className="teachers-personal-page">
      <h1 className="teachers-personal-page-h1">Teacher Personal Page</h1>

      <div className="profile-card">
        {/* ✅ Correct Image Rendering */}
        <div className="profile-image">
          <img
            className="teacher-personal-page-image"
            src={`${data.image}`}
            alt="Profile"
          />
        </div>

        <div className="profile-info">
          <h2 className="h2-section">{data.name}</h2>
          <p className="email-section">
            <strong>Email:</strong> {data.email}
          </p>
        </div>

        <div>
          <div className="button-section-div">
            <button className="button-btn-update-upd" onClick={() => navigate("/student-update")} type="button">
              Update
            </button>
            <button className="button-btn-delete-del" type="button" onClick={()=>affirmDeleting(data._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersPersonalPage;

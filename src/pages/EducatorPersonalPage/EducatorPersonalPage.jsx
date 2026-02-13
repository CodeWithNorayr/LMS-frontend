import React, { useContext, useEffect, useState } from "react";
import "./EducatorPersonalPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const EducatorPersonalPage = () => {
  const [educatorData, setEducatorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { backendURL, educatorToken, navigate } = useContext(StoreContext);

  const fetchingEducatorData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendURL}/api/educator/educator`,
        {
          headers: {
            Authorization: `Bearer ${educatorToken}`,
          },
        }
      );

      if (response.data.success) {
        setEducatorData(response.data.data);
      } else {
        toast.error("Educator data not found");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Fetching error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (educatorToken) {
      fetchingEducatorData();
    }
  }, [educatorToken]);

  const deleteEducatorById = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/educator/deleteEducator`,{
        headers:{
          "Authorization":`Bearer ${educatorToken}`
        }
      });
      if ( response.data.success ) {
        toast.success("Profile is successfully deleted");
        navigate("/educator-login");
        setEducatorData("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Deleting error");
    }
  }

  const affirmDeleting = () => {
    window.confirm('Are you sure to delete your profile')
    deleteEducatorById();
  };

  return (
    <div className="educator-personal-page">
      <h1 className="educator-personal-page-h1">Educator's Personal Page</h1>

      {/* Loading state */}
      {loading && <p>Loading educator data...</p>}

      {/* Educator data */}
      {!loading && educatorData && (
        <div className="educator-info">
          <div className="educator-info-image">
            <img className="educator-info-image-img" src={`${educatorData.image}`} alt="educator-image" />
          </div>
          <div className="educator-info-div-text">
            <h3 className="educator-info-div-text-h3">Name: {educatorData.name}</h3>
            <p className="educator-info-div-text-p">Email: {educatorData.email}</p>
          </div>
          <div className="educator-button-section-btn">
            <button onClick={()=>navigate("/educator-update")} className="educator-button-section-btn-1">
              Update
            </button>
            <button onClick={()=>affirmDeleting(educatorData._id)} className="educator-button-section-btn-2">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* If no educator */}
      {!loading && !educatorData && (
        <p>No educator data available.</p>
      )}
    </div>
  );
};

export default EducatorPersonalPage;

import React, { useContext, useState, useEffect } from "react";
import "./StudentRegistration.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const StudentRegistration = () => {
  const { backendURL, setToken, navigate } = useContext(StoreContext);

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [agreed, setAgreed] = useState(false);

  // Revoke object URL when image changes to prevent memory leaks
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (image) formData.append("image", image);
      if (resume) formData.append("resume", resume);

      const response = await axios.post(`${backendURL}/api/user/registration`, formData,{
        headers:{ "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        toast.success("User registered successfully!");
        navigate("/student-login");

        // Reset form
        setData({ name: "", email: "", password: "" });
        setImage(null);
        setResume(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="student-registration-page-fields">
      <h3 className="student-registration-page-title">Student Registration Page</h3>

      <form onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div>
          <label htmlFor="image">
            <img
              className="student-registration-page-fields-image"
              src={imagePreview || assets.profile}
              alt="profile"
            />
          </label>
          <p className="student-registration-page-upload-image">Upload an image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Mark Stepanson"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="mark@gmail.com"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          placeholder="********"
          required
        />

        {/* Resume Upload */}
        <div>
          <label htmlFor="resume">
            <img src={assets.resume} alt="resume" />
          </label>
          <input
            type="file"
            id="resume"
            accept="application/pdf"
            hidden
            onChange={(e) => setResume(e.target.files[0])}
          />
          <p className="student-registration-page-upload-resume">{resume ? resume.name : "Upload your Biography (PDF)"}</p>
        </div>

        {/* Checkbox */}
        <div>
          <input
            type="checkbox"
            required
          />
          <p className="student-registration-page-checkbox-p">Agree with the terms and conditions</p>
        </div>

        {/* Submit */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentRegistration;

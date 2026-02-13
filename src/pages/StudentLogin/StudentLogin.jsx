import React, { useContext, useState } from "react";
import "./StudentLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
 
const StudentLogin = () => {

  const { backendURL, setToken, navigate } = useContext(StoreContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${backendURL}/api/user/login`, data)

      if ( response.data.success ) {
        setToken( response.data.token );
        localStorage.setItem( "token", response.data.token );
        toast.success("User is logged in successfully");
        navigate("/");
        setData({
          email:"",
          password:""
        })
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
    
  };

  return (
    <div className="student-login-form">
      <h3 className="student-login-form-h3">Student's login</h3>

      <form
        className="student-login-form-content"
        onSubmit={onSubmitHandler}
      >
        <div className="student-login-email">
          <p className="student-login-email-p">Student's email</p>
          <input
            className="student-login-email-input"
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="student-login-password">
          <p className="student-login-password-p">Student's password</p>
          <input
            className="student-login-password-input"
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="student-login-button-section">
          <button
            className="student-login-button-btn"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;

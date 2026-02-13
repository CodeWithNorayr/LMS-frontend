import React, { useContext, useState } from 'react'
import "./EducatorLogin.css"
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify"

const EducatorLogin = () => {

  const { backendURL, navigate, setEducatorToken } = useContext(StoreContext);

  const [ data, setData ] = useState({
    email:"",
    password:""
  })

  const onChangeHandler = ( event ) => {
    const name = event.target.name
    const value = event.target.value
    setData((prev)=>({...prev,[name]:value}))
  }

  const educatorLogin = async ( event ) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/educator/login`,data);

      if ( response.data.success ) {
        setEducatorToken(response.data.token);
        localStorage.setItem("educatorToken", response.data.token);
        toast.success("Educator is logged in successfully");
        navigate("/");
        setData({
          email:"",
          password:""
        })
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Loggin failed");
    }
  }

  return (
    <div className='student-login-form'>
      <div>
        <h1 className='student-login-form-h3'>Educator login page</h1>
      </div>
      <form onSubmit={educatorLogin} className='student-login-form-content'>
        <div className='student-login-email'>
          <p className="student-login-email-p">Educator's email</p>
          <input  className="student-login-email-input" onChange={onChangeHandler} type="email" name="email" id="email" value={data.email} required/>
        </div>
        <div className="student-login-password">
          <p className="student-login-password-p">Educator's password</p>
          <input  className="student-login-password-input" onChange={onChangeHandler} type="password" name="password" id="password" value={data.password} required/>
        </div>
        <div className="student-login-button-section">
          <button  className="student-login-button-btn" type="submit">Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default EducatorLogin

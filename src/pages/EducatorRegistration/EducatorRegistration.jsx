import React, { useContext, useState } from 'react';
import "./EducatorRegistration.css";
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const EducatorRegistration = () => {

  const { backendURL, navigate, setEducatorToken } = useContext(StoreContext)
  
  const [ data, setData ] = useState({
    name:"",
    email:"",
    password:""
  })

  const [ image, setImage ] = useState(null) 
 
  const onChangeHandler = ( event ) => {
    const name = event.target.name
    const value = event.target.value
    setData((prev)=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async ( event ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name",data.name);
      formData.append("email",data.email);
      formData.append("password",data.password);
      if ( image ) formData.append("image",image);
      const response = await axios.post(`${backendURL}/api/educator/registration`,formData,{
        headers:{ "Content-Type": "multipart/form-data" }
      })
      if ( response.data.success ) {
        setEducatorToken(response.data.token);
        localStorage.setItem("educatorToken", response.data.token);
        toast.success("Educator is successfully registered");
        navigate("/educator-login");
        setData({
          name:"",
          email:"",
          password:""
        });
        setImage(null);
      } 
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className='educator-registration-section'>
      <div className='educator-registration-section-h1'>
        <h1 className='educator-registration-section-h1-h1'>Educator registration page</h1>
      </div>
      <form onSubmit={onSubmitHandler} className='educator-registration-form-section'>
        <div className='educator-registration-section-image'>
          <label htmlFor="image">
            <img className='educator-registration-section-image-img' src={image?URL.createObjectURL(image):assets.profile} alt="profile.png" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} accept='image/png, .jpeg, .jpg' type="file" name="image" id="image" hidden />
        </div>
        <div className='educator-registration-section-image-input'>
          <p className='educator-registration-section-p'>Educator's name</p>
          <input onChange={onChangeHandler} className='educator-registration-section-image-input-field' type="text" name="name" id="name" placeholder='@Sample Kyle Simplinkton' value={data.name} required />
        </div>
        <div className='educator-registration-section-input'>
          <p className='educator-registration-section-email'>Educator's email</p>
          <input onChange={onChangeHandler} className='educator-registration-section-input-email' type="email" name="email" id="email" placeholder='sample@gmail.com' value={data.email} required />
        </div>
        <div>
          <p className='educator-registration-section-password'>Educator's password</p>
          <input onChange={onChangeHandler} className='educator-registration-section-input-password' type="password" name="password" id="password" placeholder='*******000#@!' value={data.password} required />
        </div>
        <div className='input-checkbox-section'>
          <input className='educator-registration-section-input-checkbox' type="checkbox" required />
          <p className='educator-registration-section-input-checkbox-p'>Agree with the terms and conditions of the website</p>
        </div>
        <div>
          <button className='educator-submit-button' type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default EducatorRegistration

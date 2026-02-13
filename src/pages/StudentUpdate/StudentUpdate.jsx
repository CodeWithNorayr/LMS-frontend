import React, { useContext, useState } from 'react';
import "./StudentUpdate.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentUpdate = () => {

  const { backendURL, navigate, token } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [image, setImage] = useState(null);

  const [resume, setResume] = useState(null);

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const updateStudent = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (image) formData.append("image", image);
      if (resume) formData.append("resume", resume);
      const response = await axios.put(`${backendURL}/api/user/update-user`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.data.success) {
        toast.success("Changes saved");
        navigate("/");
        setData({
          name: "",
          email: "",
          password: ""
        });
        setImage(null);
        setResume(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save changes");
    }
  }

  return (
    <div>
      <div>
        <h1 className='student-update-form-h1'>Update Your Profile Page</h1>
      </div>
      <form className='student-update-form-section' onSubmit={updateStudent}>
        <div>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.profile} alt="Update image" />
          </label>
          <p className='student-update-form-update-image-p'>Update student's profile picture</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" hidden />
        </div>
        <div>
          <h3 className='student-update-form-update-image-p'>Update student's name</h3>
          <input onChange={onChangeHandler} type="text" name="name" id="name" value={data.name} />
        </div>
        <div>
          <h3 className='student-update-form-update-image-p'>Update student's email</h3>
          <input onChange={onChangeHandler} type="email" name="email" id="email" value={data.email} />
        </div>
        <div>
          <h3 className='student-update-form-update-image-p'>Update student's password</h3>
          <input onChange={onChangeHandler} value={data.password} type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="resume">
            <img src={assets.resume} alt="resume" />
          </label>
          {resume ?
            (
              <div>
                <p className='student-update-form-update-profile-bio'>{resume.name}</p>
              </div>
            )
            :
            (
              <div>
                <p className='student-update-form-update-profile-bio'>Update student's profile bio</p>
              </div>
            )}
          <input onChange={(e) => setResume(e.target.files[0])} accept='application/pdf' type="file" name="resume" id="resume" hidden />
        </div>
        <div>
          <button type="submit">Save the changes</button>
        </div>
      </form>
    </div>
  )
}

export default StudentUpdate

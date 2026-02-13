import React, { useContext, useState } from 'react';
import "./UpdateEducator.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateEducator = () => {

  const { backendURL, navigate, educatorToken } = useContext(StoreContext);

  const [ data, setData ] = useState({
    name:"",
    email:"",
    password:""
  });

  const [ image, setImage ] = useState(null);

  const onChangeHandler = ( event ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev)=>({...prev,[name]:value}));
  }

  const onSubmitHandler = async ( event ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name",data.name);
      formData.append("email",data.email);
      formData.append("password",data.password);
      if (image) formData.append("image",image);

      const response = await axios.put(`${backendURL}/api/educator/updateEducator`,formData,{
        headers:{
          "Authorization":`Bearer ${educatorToken}`
        }
      });

      if ( response.data.success ) {
        toast.success("Changes saved");
        navigate("/");
        setData({
          name:'',
          email:'',
          password:''
        });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Updating profile is failed");
    }
  }

  return (
    <div>
      <div>
        <h1>Update educator's page</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.profile} alt="image" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="image" id="image" hidden/>
          <p className="educators-update-p">Update educator's profile picture</p>
        </div>
        <div>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="name" />
          <p className="educators-update-p">Update educator's profile name</p>
        </div>
        <div>
          <input onChange={onChangeHandler} value={data.email} type="email" name="email" id="email" />
          <p className="educators-update-p">Update educator's profile email</p>
        </div>
        <div>
          <input onChange={onChangeHandler} value={data.password} type="password" name="password" id="password" />
          <p className="educators-update-p">Update educator's password</p>
        </div>
        <div>
          <button type='submit'>Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateEducator

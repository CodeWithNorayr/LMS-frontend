import React, { useContext, useEffect, useState } from 'react';
import "./Teachers.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Teachers = () => {
  
  const [ teachersData, setTeachersData ] = useState([]);
  const [ count, setCount ] = useState(0);

  const { backendURL } = useContext(StoreContext);

  const fetchingTeachersData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/educators-list/educators-list`);

      if ( response.data.success ) {
        setTeachersData(response.data.data);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Fetching data error");
    }
  }

  useEffect(()=>{
    fetchingTeachersData();
  },[])

  return (
    <div>
      <div className='teachers-data-section'>
        <h1 className='teachers-data-section-h1'>Teachers</h1>
      </div>
      <div>
        <h3 className='teachers-data-section-h1'>Teachers {count}</h3>
      </div>
      <div className='teachers-data-section'>
        {teachersData.map((teachers,index)=>(
          (
            <div className='teachers-data-section' key={index}>
              <div className='teachers-data-section-image-section'>
                <img className='teachers-data-section-img' src={`${teachers.image}`} alt="image" />
              </div>
              <div className='teachers-data-section-text-section'>
                <h3 className='teachers-data-section-text-section-h3'>{teachers.name}</h3>
                <p className='teachers-data-section-text-section-email'>Email: {teachers.email}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default Teachers

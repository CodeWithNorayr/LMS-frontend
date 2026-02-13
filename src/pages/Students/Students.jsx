import React, { useContext, useEffect, useState } from 'react';
import "./Students.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Students = () => {
  
  const { backendURL, navigate } = useContext(StoreContext);

  const [ studentsData, setStudentsData ] = useState([]);

  const [ count, setCount ] = useState(0);

  const fetchingStudents = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/users/users-total-list`)

      if ( response.data.success ) {
        setStudentsData( response.data.data );
        setCount( response.data.count );
      };
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Fetching students are failed");
    }
  }

  useEffect(()=>{
    fetchingStudents()
  },[])

  return (
    <div>
      <div className='studentsData-list-full-h1-div'>
        <h1 className='studentsData-list-full-h1'>Students</h1>
      </div>
      <div>
        <h3 className='studentsData-list-full-h1'>Students subscribed {count}</h3>
      </div>
      {studentsData.map((studnets,index)=>(
        (
          <div className='studentsData-list-full' key={index}>
            <div>
              <img className='studentsData-list-full-image' src={`${studnets.image}`} alt={studnets.name} />
            </div>
            <div>
              <h3 className='studentsData-list-full-h3'>{studnets.name}</h3>
            </div>
            <div>
              <p className='studentsData-list-full-h5'><b>Email:</b> {studnets.email}</p>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Students

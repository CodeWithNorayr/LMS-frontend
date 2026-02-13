import React, { useContext } from 'react'
import "./StudentEnterChoice.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const StudentEnterChoice = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='student-enter-choice-section'>
      <div className='student-enter-choice-section-h1'>
        <h1 className='student-enter-choice-section-h1-h1'>Enter as a student</h1>
      </div>
      <div className='student-enter-choice-section-images'>
        <img onClick={()=>navigate("/student-login")} className='student-enter-choice-section-images-img-1' src={assets.login} alt="login.png" />
        <img onClick={()=>navigate("/student-registration")} className='student-enter-choice-section-images-img-2' src={assets.register} alt="register.png" />
      </div>
    </div>
  )
}

export default StudentEnterChoice

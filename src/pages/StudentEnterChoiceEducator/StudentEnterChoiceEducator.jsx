import React, { useContext } from 'react'
import "./StudentEnterChoiceEducator.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const StudentEnterChoiceEducator = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='student-enter-choice-section'>
      <div className='student-enter-choice-section-h1'>
        <h1 className='student-enter-choice-section-h1-h1'>Enter as an educator</h1>
      </div>
      <div className='student-enter-choice-section-images'>
        <img onClick={()=>navigate("/educator-login")} className='student-enter-choice-section-images-img-1' src={assets.login} alt="login" />
        <img onClick={()=>navigate("/educator-registration")} className='student-enter-choice-section-images-img-2' src={assets.register} alt="register" />
      </div>
    </div>
  )
}

export default StudentEnterChoiceEducator

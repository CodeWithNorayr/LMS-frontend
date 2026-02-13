import "./Interim.css"
import { assets } from '../../assets/assets'
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Interim = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='interim-section'>
      <div className='interim-section-h1'>
        <h1 className='interim-section-h1'>This is the interim page</h1>
      </div>
      <div className='interim-section-img'>
        <img className='interim-section-img-1' onClick={()=>navigate("/student-enter-choice")} src={assets.student} alt="student" />
        <img className='interim-section-img-2' onClick={()=>navigate("/student-enter-choice-educator")} src={assets.educator} alt="educator" />
      </div>
    </div>
  )
}

export default Interim

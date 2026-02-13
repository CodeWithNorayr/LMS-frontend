import React from 'react'
import "./Advice.css"
import { assets } from '../../assets/assets'

const Advice = () => {
  return (
    <div className='advice-full-section-context'>
      <div className='h1-section-context-advice'>
        <h1 className='h1-section-context-advice-h1'>Learn from the best</h1>
      </div>
      <div className='p-section-context-advice'>
        <p className='p-section-context-advice-p'>Our online courses are built in partnership with technology leaders and are relevant to industry needs. Upon completing a Online course, you will receive a verified completion certificate recognized by industry leaders.</p>
      </div>
      <div className='advice-partners-images'>
        <img className='advice-partners-images-img' src={assets.deepseek} alt="deepseek" />
        <img className='advice-partners-images-img' src={assets.openAi} alt="openAi" />
        <img className='advice-partners-images-img' src={assets.google} alt="google" />
        <img className='advice-partners-images-img' src={assets.microsoft} alt="microsoft" />
        <img className='advice-partners-images-img' src={assets.nvidia} alt="nvidia" />
      </div>
    </div>
  )
}

export default Advice

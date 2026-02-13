import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer-section-full'>
      <div>
        <h1 className='footer-section-h1'>EDUCATION CENTER</h1>
      </div>
      <div>
        <div>
          <h2 className='footer-section-h2'>
            <b>EMAIL</b>: babayann30@gmail.com
          </h2>
        </div>
        <div>
            <p className='footer-section-p'><b>PHONE</b>: +37497214242</p>
            <p className='footer-section-p'><b>ADDRESS</b>: Komitas 33a apt.33</p>
        </div>
      </div>
      <div className='footer-image-section'>
        <img className='footer-image-section-img-1' src={assets.whatsapp} alt="WhatsApp" />
        <img className='footer-image-section-img-2' src={assets.telegram} alt="Telegram" />
        <img className='footer-image-section-img-3' src={assets.x} alt="X" />
        <img className='footer-image-section-img-4' src={assets.truth} alt="Truth Social" />
      </div>
    </div>
  )
}

export default Footer

import React, { useState, useEffect } from 'react'
import "./Testimonials.css"
import { assets } from '../../assets/assets'

const slides = [
  {
    image: assets.markZuckenberg,
    comment: "Courses really provide an enormous advantage",
    poster: "Mark Zuckerberg"
  },
  {
    image: assets.elonMusk,
    comment: "Anyone who joins these courses will be truly amazed",
    poster: "Elon Musk"
  },
  {
    image: assets.samAltman,
    comment: "These courses are crafted by true professionals",
    poster: "Sam Altman"
  }
]

const Testimonials = () => {
  const [fade, setFade] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)   // fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
        setFade(true)  // fade in
      }, 300)

    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="testimonials-section">

      <div className={`testimonial-slide ${fade ? "fade-in" : "fade-out"}`}>

        <div className='testimonial-image-section'>
          <img
            className='testimonial-image-img'
            src={slides[index].image}
            alt={slides[index].poster}
          />
        </div>

        <div className='testimonial-comment'>
          <h3>"{slides[index].comment}"</h3>
        </div>

        <div className='testimonial-poster'>
          <h2>{slides[index].poster}</h2>
        </div>

      </div>

    </div>
  )
}

export default Testimonials

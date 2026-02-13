import React, { useState, useEffect } from 'react'
import "./Header.css"
import { assets } from '../../assets/assets'

const slides = [
  {
    image: assets.studentsLearning1,
    title: "Take great courses from the world’s best e-learning platform",
    subtitle: "Our courses are built in partnership with technology leaders and match industry needs"
  },
  {
    image: assets.studentsLearning2,
    title: "Learn from professional instructors worldwide",
    subtitle: "High-quality content designed for real careers"
  },
  {
    image: assets.elearning,
    title: "Build skills for your future today",
    subtitle: "Join thousands of students learning with us"
  }
]

const Header = () => {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false) // start fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
        setFade(true) // fade in new slide
      }, 300)

    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='header-section-content'>

      <div className={`header-slide ${fade ? "fade-in" : "fade-out"}`}>

        <div className='header-image-section'>
          <img
            className='header-image-img'
            src={slides[index].image}
            alt="slide"
          />
        </div>

        {/*<div className='header-h3-section'>
          <h3 className='header-h3-section-h33'>
            {slides[index].title}
          </h3>
          <h6 className='header-h3-section-h66'>
            {slides[index].subtitle}
          </h6>
        </div>*/}

      </div>

    </div>
  )
}

export default Header

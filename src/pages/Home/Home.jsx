import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Advice from '../../components/Advice/Advice'
import Testimonials from '../../components/Testimonials/Testimonials'
import CoursesMenu from '../CoursesMenu/CoursesMenu'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Advice />
      <Header />
      <CoursesMenu />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home

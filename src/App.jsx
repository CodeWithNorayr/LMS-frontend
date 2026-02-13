import React from 'react'
import "./App.css"
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import { Routes, Route } from "react-router-dom"
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'   // ✅ add this
import ServicePlus from './pages/ServicePlus/ServicePlus'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import CoursesMenu from './pages/CoursesMenu/CoursesMenu'
import TeachersTeam from './pages/TeachersTeam/TeachersTeam'
import TeachersPersonalPage from './pages/TeachersPersonalPage/TeachersPersonalPage'
import UpcomingCourseDetails from './pages/UpcomingCourseDetails/UpcomingCourseDetails'
import Cart from './pages/Cart/Cart'
import Navbar from './components/Navbar/Navbar'
import StudentRegistration from './pages/StudentRegistration/StudentRegistration'
import StudentLogin from './pages/StudentLogin/StudentLogin'
import Interim from './pages/Interim/Interim'
import StudentEnterChoice from './pages/StudentEnterChoice/StudentEnterChoice'
import StudentEnterChoiceEducator from './pages/StudentEnterChoiceEducator/StudentEnterChoiceEducator'
import EducatorLogin from './pages/EducatorLogin/EducatorLogin'
import EducatorRegistration from './pages/EducatorRegistration/EducatorRegistration'
import EducatorProtectedRoute from './components/EducatorProtectedRoute/EducatorProtectedRoute'
import EducatorDashboard from './pages/EducatorDashboard/EducatorDashboard'
import AddLecture from './pages/AddLecture/AddLecture'
import Lectures from './pages/Lectures/Lectures'
import ManageLectures from './pages/ManageLectures/ManageLectures'
import UpcomingLectures from './pages/UpcomingLectures/UpcomingLectures'
import ManageUpcomingLectures from './pages/ManageUpcomingLectures/ManageUpcomingLectures'
import Teachers from './pages/Teachers/Teachers'
import Students from './pages/Students/Students'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import StudentProtectedRoute from './components/StudentProtectedRoute/StudentProtectedRoute'
import StudentUpdate from './pages/StudentUpdate/StudentUpdate'
import UpdateEducator from './pages/UpdateEducator/UpdateEducator'
import EducatorPersonalPage from './pages/EducatorPersonalPage/EducatorPersonalPage'
import UpdateCourses from './pages/UpdateCourses/UpdateCourses'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders.jsx/MyOrders'
import Verify from './pages/Verify/Verify'


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />   {/* ✅ fixed */}
        <Route path='/service-plus' element={<ServicePlus />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/courses-menu' element={<CoursesMenu />} />
        <Route path='/teachers-team' element={<TeachersTeam />} />
        <Route path='/teachers-personal-pages' element={<TeachersPersonalPage />} />
        <Route path='/upcoming-course-details/:id' element={<UpcomingCourseDetails />} />
        <Route path='/cart-details' element={<Cart />} />
        <Route path='/student-registration' element={<StudentRegistration />} />
        <Route path='/student-login' element={<StudentLogin />} />
        <Route path='/interim' element={<Interim />} />
        <Route path='/interim-educator' element={<Interim />} />
        <Route path='/student-enter-choice' element={<StudentEnterChoice />} />
        <Route path='/student-enter-choice-educator' element={<StudentEnterChoiceEducator />} />
        <Route path='/educator-login' element={<EducatorLogin />} />
        <Route path='/educator-registration' element={<EducatorRegistration />} />
        <Route path='/students-list' element={<Students />} />
        <Route path='/teachers-list' element={<Teachers />} />

        <Route
          path='/student-update'
          element={
            <StudentProtectedRoute>
              <StudentUpdate />
            </StudentProtectedRoute>
          }
        />

        <Route 
          path='/verify'
          element={
            <StudentProtectedRoute>
              <Verify />
            </StudentProtectedRoute>
          }
        />

        <Route 
          path='/orders'
          element={
            <StudentProtectedRoute>
              <MyOrders />
            </StudentProtectedRoute>
          }
        />

        <Route
          path='/course-details/:id'
          element={
            <EducatorProtectedRoute>
              <CourseDetails />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/course-update/:id'
          element={
            <EducatorProtectedRoute>
              <UpdateCourses />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/educator-dashboard'
          element={
            <EducatorProtectedRoute>
              <EducatorDashboard />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/educator-personal-page'
          element={
            <EducatorProtectedRoute>
              <EducatorPersonalPage />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/educator-update'
          element={
            <EducatorProtectedRoute>
              <UpdateEducator />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/add-lecture'
          element={
            <EducatorProtectedRoute>
              <AddLecture />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/lectures'
          element={
            <EducatorProtectedRoute>
              <Lectures />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/manage-lectures'
          element={
            <EducatorProtectedRoute>
              <ManageLectures />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/upcoming-lectures'
          element={
            <EducatorProtectedRoute>
              <UpcomingLectures />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/manage-upcoming-lectures'
          element={
            <EducatorProtectedRoute>
              <ManageUpcomingLectures />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/teachers'
          element={
            <EducatorProtectedRoute>
              <Teachers />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/students'
          element={
            <EducatorProtectedRoute>
              <Students />
            </EducatorProtectedRoute>
          }
        />

        <Route
          path='/place-order'
          element={
            <StudentProtectedRoute>
              <PlaceOrder />
            </StudentProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App

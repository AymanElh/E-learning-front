// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from "./components/common/Header.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses.jsx';
import Categories from './pages/Categories';
import Footer from "./components/common/Footer.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";

function App() {
  return (
      <>
          <Router>
              <div className="app">
                  <Header />
                  <>

                  </>
                  <main>
                      <Routes>
                          <Route path="/" element={<Courses />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/courses/create" element={<CreateCourse />} />
                          <Route path="/courses/:id" element={<CourseDetails />} />
                          <Route path="/categories" element={<Categories />} />
                      </Routes>
                  </main>
                  <Footer />
              </div>
          </Router>
      </>
  )
}

export default App

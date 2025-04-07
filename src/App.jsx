// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from "./common/Header.jsx";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Categories from './pages/Categories';

function App() {
  return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/courses" element={<Courses />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </>
  )
}

export default App

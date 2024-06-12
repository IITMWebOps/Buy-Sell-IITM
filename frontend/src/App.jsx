import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home'
import AboutUs from './Page/AboutUs/AboutUs';
import ContactUs from './Page/ContactUs/ContactUs';
import FAQ from './Page/FAQ/FAQ';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/faq' element={<FAQ />} />

        <Route path='/login' element={<h1>Login</h1>} />
        <Route path='/register' element={<h1>Register</h1>} />
      </Routes>
    </Router>
  )
}

export default App

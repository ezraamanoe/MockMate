import './App.css'
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hero from './Hero.jsx';
import Form from './Form.jsx';
import Chatbot from './Chatbot.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} /> 
        <Route path="/form" element={<Form />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  )
}

export default App
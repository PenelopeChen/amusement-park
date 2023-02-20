import React from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Signup from '../components/Signup'; 
import Login from '../components/Login'; 
import Home from '../components/Home';
import Subscribe from './Subscribe';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <nav>
        {location.pathname !== '/' && <Link to="/">Home</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </div>
  );
}

export default App;

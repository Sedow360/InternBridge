import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DatabaseConfigPage from './pages/DatabaseConfigPage';
import Navbar from './components/Navbar';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/database-config" element={<DatabaseConfigPage />} />
      </Routes>
    </Router>
  );
};

export default App;

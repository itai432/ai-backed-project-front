import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.scss';
import { isAuthenticated, logout } from '../services/authService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated() ? (
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/database-config">Database Config</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

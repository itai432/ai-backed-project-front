import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/database-config">Database Config</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

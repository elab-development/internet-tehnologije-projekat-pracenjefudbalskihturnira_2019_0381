import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">Početna</Link>
        <Link to="/tournaments">Turniri</Link>
        <Link to="/contact">Kontakt</Link>
        <Link to="/about">O nama</Link>
        
      </nav>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Dobrodošli na praćenje fudbalskih turnira</h1>
        <Link to="/tournaments" className="btn-primary">Pogledaj turnire</Link>
      </div>
    </div>
  );
};

export default Home;

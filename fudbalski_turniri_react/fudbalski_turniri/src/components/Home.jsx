import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Welcome to the page for tracking football tournaments</h1>
        <Link to="/tournaments" className="btn-primary">
          View Tournaments
        </Link>
      </div>
      <div className="gif-container">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm80aTd5MG83c2Z5OGttYTRyYTBqbms5Mmxzb3NlNDRjYXhhZTNwYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L18cE2kcuo1TqzC8No/giphy.gif"
          alt="Football GIF"
        />
      </div>
    </div>
  );
};

export default Home;

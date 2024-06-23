import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Tournaments from './components/Tournaments';
import Navbar from './components/Navbar';
import { useState } from "react";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [allTournaments] = useState([
  {
    id: 1,
    Tournament_name: "FIFA World Cup",
    image: "fifaWorldCup.png",
  },
  {
    id: 2,
    Tournament_name: "UEFA Champions League",
    image: "fifaWorldCup.png",
  },
  {
    id: 3,
    Tournament_name: "Premier League",
    image: "fifaWorldCup.png",
  },
  {
    id: 4,
    Tournament_name: "La Liga",
    image: "fifaWorldCup.png",
  },
  {
    id: 5,
    Tournament_name: "Bundesliga",
    image: "fifaWorldCup.png",
  },
]);

  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/tournaments" element={<Tournaments allTournaments = {allTournaments} />} />
      </Routes>
    </div>
  );
};

export default App;

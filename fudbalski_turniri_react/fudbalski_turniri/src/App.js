import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Tournaments from './components/Tournaments';
import Navbar from './components/Navbar';
import { useState } from "react";
import TournamentBracket from './components/TournamentBracket';

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


const [teamsData] = useState([
  { id: 1, name: 'Italy', points: 9 },
  { id: 2, name: 'Switzerland', points: 4 },
  { id: 3, name: 'Turkey', points: 1 },
  { id: 4, name: 'Wales', points: 4 },
  { id: 5, name: 'Belgium', points: 9 },
  { id: 6, name: 'Denmark', points: 3 },
  { id: 7, name: 'Finland', points: 3 },
  { id: 8, name: 'Russia', points: 3 },
  { id: 9, name: 'Austria', points: 6 },
  { id: 10, name: 'Netherlands', points: 9 },
  { id: 11, name: 'North Macedonia', points: 0 },
  { id: 12, name: 'Ukraine', points: 3 },
  { id: 13, name: 'Croatia', points: 4 },
  { id: 14, name: 'Czech Republic', points: 4 },
  { id: 15, name: 'England', points: 7 },
  { id: 16, name: 'Scotland', points: 1 },
  { id: 17, name: 'Poland', points: 1 },
  { id: 18, name: 'Slovakia', points: 3 },
  { id: 19, name: 'Spain', points: 5 },
  { id: 20, name: 'Sweden', points: 7 },
  { id: 21, name: 'France', points: 5 },
  { id: 22, name: 'Germany', points: 4 },
  { id: 23, name: 'Hungary', points: 2 },
  { id: 24, name: 'Portugal', points: 4 }
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
        <Route path="/tournament-bracket" element={<TournamentBracket teamsData = {teamsData} />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Tournaments from "./components/Tournaments";
import Navbar from "./components/Navbar";
import TournamentBracket from "./components/TournamentBracket";
import "./App.css";

const App = () => {
  const [allTournaments, setAllTournaments] = useState([]); // Initialize with null


  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
        );
        const filteredLeagues = response.data.leagues.filter(
          (league) => league.strSport === "Soccer"
        );
        const leaguesArray = filteredLeagues.map((league) => ({
          name: league.strLeague,
          leagueId: league.idLeague,
        }));
        setAllTournaments(leaguesArray); // Update state with fetched data
        //console.log(leaguesArray);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  

  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/tournaments"
          element={
            <Tournaments
              allTournaments={allTournaments}
            />
          }
        />       
        <Route
          path="/tournament-bracket/:leagueId"
          element={
            <TournamentBracket
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

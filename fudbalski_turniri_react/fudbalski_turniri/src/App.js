import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Tournaments from "./components/Tournaments";
import Navbar from "./components/Navbar";
import TournamentBracket from "./components/TournamentBracket";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import "./App.css";
import MessageModal from "./components/MessageModal";
import { UserContextProvider } from "./components/Context/UserContext";
import NewTournaments from "./components/NewTournaments";
import NewTeam from "./components/NewTeams";
import Forma from "./components/Forma";

const App = () => {
  const [allTournaments, setAllTournaments] = useState([]);

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
        setAllTournaments(leaguesArray);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <UserContextProvider>
      <div>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/newTournament" element={<NewTournaments />} />
          <Route path="/newTeam" element={<NewTeam />} />
          <Route
            path="/tournaments"
            element={<Tournaments allTournaments={allTournaments} />}
          />
          <Route
            path="/tournament-bracket/:leagueId"
            element={<TournamentBracket />}
          />
          <Route path="/form" element={<Forma />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messageModal" element={<MessageModal />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
};

export default App;

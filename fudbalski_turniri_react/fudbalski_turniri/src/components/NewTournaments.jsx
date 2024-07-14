import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewTournament.module.css";

const API_URL = "http://127.0.0.1:8000/api";

const NewTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await fetch(`${API_URL}/tournaments`);
        if (!response.ok) {
          throw new Error("Failed to fetch tournaments");
        }
        const data = await response.json();
        // Map fetched data to extract id and tournament_name
        const mappedTournaments = data.map((tournament) => ({
          id: tournament.id,
          name: tournament.Tournament_name,
        }));
        setTournaments(mappedTournaments);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchTournaments();
  }, []);

  const handleClick = (id) => {
    navigate(`/newTeam`, { state: { id } });
  };

  return (
    <div className={classes.tournamentsContainer}>
      {tournaments.map((tournament, index) => (
        <div
          key={index}
          className={classes.imgWrapper}
          onClick={() => handleClick(tournament.id)}
        >
          <img
            className={classes.tournamentImg}
            src="/football_icon.png"
            alt={tournament.name}
          />
          <p className={classes.name}>{tournament.name}</p>
        </div>
      ))}
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default NewTournaments;

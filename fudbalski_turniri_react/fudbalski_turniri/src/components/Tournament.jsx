import React from "react";
import classes from "./Tournament.module.css";
import { useNavigate } from "react-router-dom";

function Tournament({ tournament, leagueId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    let path = `/tournament-bracket/${leagueId}/?name=${tournament}`;
    navigate(path);
  };

  return (
    <div className={classes.tournamentsContainer}>
      <div onClick={handleClick} className={classes.imgWrapper}>
        <img
          className={classes.tournamentImg}
          src="/football_icon.png"
          alt={tournament}
        />
        <p className={classes.name}>{tournament}</p>
      </div>
    </div>
  );
}

export default Tournament;
import React from "react";
import Teams from "./Teams";
import classes from "./TournamentBracket.module.css";

const TournamentBracket = ({ teamsData }) => {
  return (
    <div className={classes.tournamentBracket}>
      <h1>Euro Football Cup</h1>
      <Teams teamsData={teamsData} />
    </div>
  );
};

export default TournamentBracket;

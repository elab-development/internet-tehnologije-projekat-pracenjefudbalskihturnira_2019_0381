import React from "react";
import Team from './Team';
import classes from "./TournamentBracket.module.css";

const TournamentBracket = ({ teamsData }) => {
  return (
    <div className={classes.tournamentBracket}>
      <h1>Euro Football Cup</h1>
      <Team teamsData={teamsData} />
    </div>
  );
};

export default TournamentBracket;

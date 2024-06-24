import React from "react";
import Teams from "./Teams";
import classes from "./TournamentBracket.module.css";
import {useSearchParams } from 'react-router-dom';

const TournamentBracket = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  return (
    <div className={classes.tournamentBracket}>
      <h1 className={classes.title}>{name}</h1>
      <Teams/>  
    </div>
  );
};

export default TournamentBracket;

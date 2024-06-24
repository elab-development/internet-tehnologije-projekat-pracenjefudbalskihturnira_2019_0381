import React from "react";
import Tournament from "./Tournament";
import classes from "./Tournaments.module.css";

const Tournaments = ({ allTournaments}) => {

  

  return (
    <div className={classes.home}>
      <h1 className={classes.middle}>Football Tournaments</h1>
      <div className={classes.allTournaments}>
        {allTournaments.length !== 0
          ? allTournaments.map((tournament, index) => (
              <Tournament
              key={index}
              tournament={tournament.name}
              leagueId={tournament.leagueId}              
            />
            ))
          : null}
      </div>
    </div>
  );
};

export default Tournaments;

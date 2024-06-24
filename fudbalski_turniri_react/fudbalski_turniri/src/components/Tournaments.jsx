import React from "react";
import Tournament from "./Tournament";
import classes from "./Tournaments.module.css";

const Tournaments = ({ allTournaments }) => {
  return (
    <div className={classes.home}>
      <div className={classes.allTournaments}>
        {allTournaments.map((tournament) => (
          <Tournament
            Tournament_name={tournament.Tournament_name}
            image={tournament.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;

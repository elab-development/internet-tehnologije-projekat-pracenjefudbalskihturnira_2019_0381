import React from "react";
import classes from "./TournamentBracket.module.css";

const TournamentBracket = () => {
  return (
    <div className={classes.bracket}>
      {/* Round 1 */}
      <div className={classes.round}>
        <div className={classes.match}>
          <div className={classes.team}>Team A</div>
          <div className={classes.team}>Team B</div>
        </div>
        <div className={classes.match}>
          <div className={classes.team}>Team C</div>
          <div className={classes.team}>Team D</div>
        </div>
      </div>

      {/* Round 2 */}
      <div className={classes.round}>
        <div className={classes.match}>
          <div className={classes.team}>Winner of Match 1</div>
          <div className={classes.team}>Winner of Match 2</div>
        </div>
      </div>

      {/* Round 3 (Final) */}
      <div className={classes.round}>
        <div className={classes.match}>
          <div className={classes.team}>Finalist 1</div>
          <div className={classes.team}>Finalist 2</div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;

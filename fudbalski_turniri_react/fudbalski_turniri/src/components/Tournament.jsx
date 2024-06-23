import React from "react";
import classes from "./Tournament.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Tournament({Tournament_name, image, }) {
  const [descIsHidden, setDescIsHidden] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/TournamentsBracket');
  };

  function handleDescription() {
    setDescIsHidden((prevState) => !prevState);
  }

  return (
    <div
      onMouseEnter={handleDescription}
      onMouseLeave={handleDescription}
      className={classes.TournamentFrame}
    >
      <div className={classes.imgWrapper}>
      
      <img
          className={classes.tournamentImg}
          src={image}
          onClick={handleClick}
          
        />
      
      </div>

      <div className={classes.overlay}></div>

      <div
        className={
          descIsHidden
            ? classes.descriptionWrapper + " " + classes.hide
            : classes.descriptionWrapper + " " + classes.show
        }
        >
        <p className={classes.description}>
          <span className={classes.bolderDescription}>{Tournament_name}</span>
        </p>
      </div>
    </div>
  );
}

export default Tournament;

import React, { useState, useEffect } from "react";
import classes from "./Teams.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Teams = () => {
  const [Results, setResults] = useState([]);
  const {leagueId} = useParams();

  useEffect(() => {
    const fetchEventResults = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=" +
            leagueId +
            "&s=2020-2021"
        );
        console.log(response);
        if (response.data !== "") {
          setResults(response.data.table);
        }
      } catch (error) {
        console.error("Error fetching event results:", error);
      }
    };

    fetchEventResults();
  }, [leagueId]);

  return (
    <div className={classes.tableContainer}>
      {Results.length === 0 ? (
        <p className={classes.para}>No data available for this year.</p>
      ) : (
        <table className={classes.standingsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {Results.map((team, index) => (
              <tr key={team.idStanding}>
                <td>{team.intRank}</td>
                <td className={classes.tdImg}>
                  <img
                    src={team.strBadge}
                    alt={team.strTeam}
                    className={classes.teamLogo}
                  />
                  {team.strTeam}
                </td>
                <td>{team.intPlayed}</td>
                <td>{team.intWin}</td>
                <td>{team.intDraw}</td>
                <td>{team.intLoss}</td>
                <td>{team.intGoalsFor}</td>
                <td>{team.intGoalsAgainst}</td>
                <td>{team.intGoalDifference}</td>
                <td>{team.intPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teams;

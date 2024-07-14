import React, { useState, useEffect} from "react";
import classes from "./Teams.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

const Teams = () => {
  const [Results, setResults] = useState([]);
  const { leagueId } = useParams();
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

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

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const sortedResults = [...Results].sort((a, b) => {
    if (sortBy === "strTeam") {
      return sortDirection === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    } else {
      const valueA = parseFloat(a[sortBy]);
      const valueB = parseFloat(b[sortBy]);

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }
  });

  const exportCSV = () => {
    const header = Object.keys(sortedResults[0]).join(",");
    const csv = sortedResults.map((team) =>
      Object.values(team)
        .map((value) => (typeof value === "string" ? `"${value}"` : value))
        .join(",")
    );
    csv.unshift(header);
    const csvString = csv.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "teams_data.csv");
  };

  return (
    <div className={classes.tableContainer}>
      {Results.length === 0 ? (
        <p className={classes.para}>No data available for this year.</p>
      ) : (
        <div>
          <table className={classes.standingsTable}>
            <thead>
              <tr>
                <SortableHeader
                  label="#"
                  onClick={() => handleSort("intRank")}
                  sortOrder={sortBy === "intRank" ? sortDirection : null}
                />
                <SortableHeader
                  label="Team"
                  onClick={() => handleSort("strTeam")}
                  sortOrder={sortBy === "strTeam" ? sortDirection : null}
                />
                <SortableHeader
                  label="MP"
                  onClick={() => handleSort("intPlayed")}
                  sortOrder={sortBy === "intPlayed" ? sortDirection : null}
                />
                <SortableHeader
                  label="W"
                  onClick={() => handleSort("intWin")}
                  sortOrder={sortBy === "intWin" ? sortDirection : null}
                />
                <SortableHeader
                  label="D"
                  onClick={() => handleSort("intDraw")}
                  sortOrder={sortBy === "intDraw" ? sortDirection : null}
                />
                <SortableHeader
                  label="L"
                  onClick={() => handleSort("intLoss")}
                  sortOrder={sortBy === "intLoss" ? sortDirection : null}
                />
                <SortableHeader
                  label="GF"
                  onClick={() => handleSort("intGoalsFor")}
                  sortOrder={sortBy === "intGoalsFor" ? sortDirection : null}
                />
                <SortableHeader
                  label="GA"
                  onClick={() => handleSort("intGoalsAgainst")}
                  sortOrder={
                    sortBy === "intGoalsAgainst" ? sortDirection : null
                  }
                />
                <SortableHeader
                  label="GD"
                  onClick={() => handleSort("intGoalDifference")}
                  sortOrder={
                    sortBy === "intGoalDifference" ? sortDirection : null
                  }
                />
                <SortableHeader
                  label="Pts"
                  onClick={() => handleSort("intPoints")}
                  sortOrder={sortBy === "intPoints" ? sortDirection : null}
                />
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((team, index) => (
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
          <button onClick={exportCSV} className={classes.exportButton}>
            Export CSV
          </button>
        </div>
      )}
    </div>
  );
};

const SortableHeader = ({ label, onClick, sortOrder }) => (
  <th onClick={onClick}>
    {label} {sortOrder && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
  </th>
);

export default Teams;

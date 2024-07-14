import React, { useState, useEffect } from "react";
import Tournament from "./Tournament";
import classes from "./Tournaments.module.css";

const Tournaments = ({ allTournaments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTournaments, setFilteredTournaments] = useState([]);


  useEffect(() => {
    const filtered = allTournaments.filter((tournament) =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTournaments(filtered);
    setCurrentPage(1); 
  }, [allTournaments, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTournaments = filteredTournaments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={classes.home}>
      <h1 className={classes.middle}>Football Tournaments</h1>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search tournaments..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
      </div>
      <div className={classes.allTournaments}>
        {currentTournaments.length !== 0 ? (
          currentTournaments.map((tournament, index) => (
            <Tournament
              key={index}
              tournament={tournament.name}
              leagueId={tournament.leagueId}
            />
          ))
        ) : (
          <p>No tournaments match your search.</p>
        )}
      </div>
      {filteredTournaments.length > itemsPerPage && (
        <div className={classes.pagination}>
          <ul className={classes.paginationList}>
            {Array.from(
              { length: Math.ceil(filteredTournaments.length / itemsPerPage) },
              (_, index) => (
                <li key={index} className={classes.paginationItem}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={index + 1 === currentPage ? classes.active : ""}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tournaments;

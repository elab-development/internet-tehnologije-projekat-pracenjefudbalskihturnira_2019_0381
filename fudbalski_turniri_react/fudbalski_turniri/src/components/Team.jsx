import React, { useState, useEffect } from 'react';
import classes from './Team.module.css';


const Team = ({ teamsData }) => {
    const [groups, setGroups] = useState({});
  
    useEffect(() => {
      const shuffledTeams = [...teamsData].sort(() => Math.random() - 0.5);
      const groupedTeams = shuffledTeams.reduce((groups, team, index) => {
        const groupKey = String.fromCharCode(65 + Math.floor(index / 4)); 
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(team);
        return groups;
      }, {});
      setGroups(groupedTeams);
    }, [teamsData]);
  
    return (
      <div className={classes.groupsContainer}>
        {Object.entries(groups).map(([group, teams]) => (
          <div key={group} className={classes.group}>
            <h2>Group {group}</h2>
            <ul>
              {teams.map(team => (
                <li key={team.id} className={classes.teamItem}>
                  <span>{team.name}</span>
                  <span>{team.points} points</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default Team;
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import classes from "./NewTeams.module.css";
import UserContext from "./Context/UserContext";

const API_URL = "http://127.0.0.1:8000/api";

const NewTeams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const location = useLocation();
  const { isLoggedIn, role } = useContext(UserContext);

  useEffect(() => {
    const { id: tournamentId } = location.state || {};

    if (tournamentId) {
      fetchTeams(tournamentId);
      setSelectedTournamentId(tournamentId);
    } else {
      setError("No tournament ID provided");
    }
  }, [location.state]);

  const fetchTeams = async (tournamentId) => {
    try {
      const response = await fetch(
        `${API_URL}/tournaments/${tournamentId}/teams`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      setError(error.message);
    }
  };

  async function deleteTeam(teamId) {
    try {
      const response = await fetch(`${API_URL}/teams/${teamId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete team");
      }
      setTeams(teams.filter((team) => team.id !== teamId));
      setSelectedTeam(null);
    } catch (error) {
      setError(error.message);
    }
  }

  async function editTeam(teamId, updatedData) {
    try {
      const year = parseInt(updatedData.year);
      if (isNaN(year) || year < 0) {
        alert("Year must be a valid number for year");
        return;
      }

      const response = await fetch(`${API_URL}/teams/${teamId}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to edit team");
      }
      fetchTeams(selectedTeam.tournament_id);
      closeEditModal();
    } catch (error) {
      setError(error.message);
    }
  }

  async function addTeam(newTeamData) {
    try {
      const year = parseInt(newTeamData.year);
      if (isNaN(year) || year < 0 || year > 2024) {
        alert("Year must be a valid number for year");
        return;
      }

      const response = await fetch(
        `${API_URL}/teams/${selectedTournamentId}/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeamData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add team");
      }
      fetchTeams(selectedTournamentId);
      closeAddModal();
    } catch (error) {
      setError(error.message);
    }
  }

  const handleRowClick = (team) => {
    setSelectedTeam(team);
  };

  const openEditModal = () => {
    if (selectedTeam) {
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTeam(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedTeam) {
      deleteTeam(selectedTeam.id);
    }
  };

  const handleDeselect = () => {
    setSelectedTeam(null);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className={classes.teamsContainer}>
      <h2>Teams for Selected Tournament</h2>
      {error ? (
        <p className={classes.error}>{error}</p>
      ) : (
        <>
          <table className={classes.teamTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Coach</th>
                <th>Year</th>
                <th>Tournament ID</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.id}
                  className={
                    selectedTeam?.id === team.id ? classes.selectedRow : ""
                  }
                  onClick={() => handleRowClick(team)}
                >
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.coach}</td>
                  <td>{team.year}</td>
                  <td>{team.tournament_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.buttonContainer}>
            <button
              onClick={handleDeselect}
              disabled={!selectedTeam || !isLoggedIn}
            >
              Deselect
            </button>
            <button
              onClick={openEditModal}
              disabled={
                !selectedTeam ||
                !isLoggedIn ||
                role === "privilegedUser" ||
                role === "user"
              }
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={
                !selectedTeam ||
                !isLoggedIn ||
                role === "privilegedUser" ||
                role === "user"
              }
            >
              Delete
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedTeam || !isLoggedIn || role === "user"}
            >
              Add
            </button>
          </div>
        </>
      )}
      <EditTeamModal
        team={selectedTeam}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={editTeam}
      />

      <AddTeamModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={addTeam}
      />
    </div>
  );
};

const EditTeamModal = ({ team, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    year: team?.year || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(team.id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className={`${classes.modal} ${isOpen ? classes.modalOpen : ""}`}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

const AddTeamModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", year: "" });
  };

  if (!isOpen) return null;

  return (
    <div className={`${classes.modal} ${isOpen ? classes.modalOpen : ""}`}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};
export default NewTeams;

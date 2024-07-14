import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setRole("");
    navigate("/login");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken != undefined && accessToken != null) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          Početna
        </Link>
        <Link to="/newTournament">Novi turniri</Link>
        <Link to="/tournaments">Turniri</Link>
        <Link to="/form">Contact</Link>
        <Link to="/about">O nama</Link>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

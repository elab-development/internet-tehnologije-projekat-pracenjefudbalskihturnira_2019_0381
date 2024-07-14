import React, { useState, useContext } from "react";
import authService from "./AuthService";
import classes from "./AuthForm.module.css";
import MessageModal from "./MessageModal";
import UserContext from "./Context/UserContext";

const Login = () => {
  const {isLoggedIn, setLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(email, password);
      const { access_token } = response;

      localStorage.setItem("access_token", access_token);
      setLoggedIn(true);
      console.log("Logged in successfully:", response);
      setMessage("Login successful!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  const closeModal = () => {
    setMessage(null);
  };

  return (
    <div className={classes.authContainer}>
      <form className={classes.authForm} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button
          type="button"
          className={classes.registerButton}
          onClick={() => (window.location.href = "/register")}
        >
          Register
        </button>
      </form>
      {message && <MessageModal message={message} onClose={closeModal} />}
    </div>
  );
};

export default Login;

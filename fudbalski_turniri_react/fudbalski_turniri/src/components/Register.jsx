import React, { useState } from "react";
import authService from "./AuthService";
import MessageModal from "./MessageModal";
import classes from "./AuthForm.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.register(username, email, password);

      console.log("Registered successfully:", response);
      setMessage("Registration successful!");
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
        setError(error.response.data); // Capture server-side validation errors
      } else {
        console.error("Registration failed:", error.message);
      }
    }
  };

  const closeModal = () => {
    setMessage(null);
  };

  return (
    <div className={classes.authContainer}>
      <form className={classes.authForm} onSubmit={handleRegister}>
        <h2>Register</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        {error && <p className={classes.error}>{error.username}</p>}
        <button type="submit">Register</button>
      </form>
      {message && <MessageModal message={message} onClose={closeModal} />}
    </div>
  );
};

export default Register;

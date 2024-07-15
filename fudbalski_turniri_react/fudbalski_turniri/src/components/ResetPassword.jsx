
import React, { useState } from "react";
import authService from "./AuthService";
import classes from "./AuthForm.module.css";
import MessageModal from "./MessageModal";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await authService.resetPassword(email, newPassword);
      setMessage("Password reset successful! You can now log in with your new password.");
      setEmail("");
      setNewPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("Password reset failed. Please check your details.");
    }
  };

  const closeModal = () => {
    setMessage(null);
  };

  return (
    <div className={classes.authContainer}>
      <form className={classes.authForm} onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
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
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <MessageModal message={message} onClose={closeModal} />}
    </div>
  );
};

export default ResetPassword;

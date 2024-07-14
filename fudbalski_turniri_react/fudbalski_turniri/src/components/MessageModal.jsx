import React from "react";
import classes from "./MessageModal.module.css";

const MessageModal = ({ message, onClose }) => {
  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modal}>
        <p
          className={
            message.startsWith("Login successful")
              ? classes.successMessage
              : classes.errorMessage
          }
        >
          {message}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;

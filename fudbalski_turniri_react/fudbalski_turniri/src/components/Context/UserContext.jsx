import { createContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  function setLoggedIn(value) {
    setIsLoggedIn(value);
  }

  const context = {
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn,
    role: role,
    setRole: setRole,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;

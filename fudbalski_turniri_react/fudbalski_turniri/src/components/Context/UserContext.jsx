import { createContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function setLoggedIn(value) {
    setIsLoggedIn(value);
  }

  const context = {
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;

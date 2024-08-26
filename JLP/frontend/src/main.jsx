// main.jsx

import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

export const Context = createContext({
  isAuthorized: false,
  userType: "jobseeker", // Default to job seeker
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("jobseeker"); // Default to job seeker

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        userType,
        setUserType,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

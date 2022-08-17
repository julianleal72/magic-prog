import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((client) => {
          setUser(client);
          console.log(client);
        });
      } else {
        console.log("We're not rendering nothing pal");
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
    console.log(user);
  }

  function handleLogout() {
    navigate("/");
    setUser(null);
    console.log(null);
  }

  function deleteUser() {
    setUser(null);
    navigate("/");
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }
  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };

import React from "react";
import { NavLink } from "react-router-dom";

function UserNav({ user }) {
  return (
    <div>
      <nav className="nav-bar">
        <NavLink className="link" to="/user">
          <button variant="outlined" style={{ color: "#000000" }}>
            My Stuff
          </button>
        </NavLink>
      </nav>
      <nav className="nav-bar">
        <NavLink className="link" to="/">
          <button variant="outlined" style={{ color: "#000000" }}>
            Home
          </button>
        </NavLink>
      </nav>
    </div>
  );
}

export default UserNav;

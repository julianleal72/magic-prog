import React from "react";
import { NavLink } from "react-router-dom";

function UserNav({user}) {
  return (
    <nav className="nav-bar">
      <NavLink className="link" to="/user">
        <button variant="outlined" style={{ color: "#000000" }}>
          User
        </button>
      </NavLink>
      <NavLink className="link" to="/user/recipes">
        <button variant="outlined" style={{ color: "#000000" }}>
          My Stuff
        </button>
      </NavLink>
      {/* <NavLink className="link" to="/user/reviews" state={{user: {user}}}>
        <button variant="outlined" style={{ color: "#000000" }}>
          My Stuff
        </button>
      </NavLink> */}
    </nav>
  );
}

export default UserNav;

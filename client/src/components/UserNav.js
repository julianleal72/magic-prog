import React from "react";
import { NavLink, Link } from "react-router-dom";

function UserNav({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div>
      {user ? <p>Welcome, {user.username}!</p> : null}
      <nav className="nav-bar">
        <NavLink className="link" to="/">
          <button variant="outlined" style={{ color: "#000000" }}>
            Home
          </button>
        </NavLink>
        {user ? null : (
          <Link to="signup">
            <button variant="outlined" style={{ color: "#000000" }}>
              Signup
            </button>
          </Link>
        )}
        {user ? (
          <NavLink className="link" to="/user">
            <button variant="outlined" style={{ color: "#000000" }}>
              My Stuff
            </button>
          </NavLink>
        ) : null}
        {user ? (
          <button
            variant="outlined"
            style={{ color: "#000000" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button variant="outlined" style={{ color: "#000000" }}>
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default UserNav;

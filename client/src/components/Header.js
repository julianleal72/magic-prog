import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <header>
      {user ? null: <Link to="signup">
      <Button variant="outlined" style={{color:"#000000"}}>Signup</Button>
      </Link>}

      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <Button variant="outlined" style={{color:"#000000"}} onClick={handleLogout}>Logout
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button variant="outlined" style={{color:"#000000"}}>Login</Button>
        </Link>
      )}

      <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700display=swap"
      />
    </header>
  );
}

export default Header;
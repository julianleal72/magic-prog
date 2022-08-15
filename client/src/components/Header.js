import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <header>
      {user ? null: <Link to="signup">
      <button variant="outlined" style={{color:"#000000"}}>Signup</button>
      </Link>}

      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button variant="outlined" style={{color:"#000000"}} onClick={handleLogout}>Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button variant="outlined" style={{color:"#000000"}}>Login</button>
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
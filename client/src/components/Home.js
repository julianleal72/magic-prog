import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Home.css";

function Home({ user }) {
  return (
    <div className="body">
      {user ? null : (
        <div className="getInLoser">
          <Link to="signup" className="gimmeSpace">
            <Button variant="outlined" color="secondary">Signup</Button>
          </Link>
          <Link to="/login" className="gimmeSpace">
            <Button variant="outlined" color="error">Login</Button>
          </Link>
        </div>
      )}
      {user ? (
        <Button>
          <Link to="/drafter" className="gimmeSpace">Draft!</Link>
        </Button>
      ) : null}
    </div>
  );
}

export default Home;

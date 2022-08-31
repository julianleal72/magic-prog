import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Home.css";
import {ImEnter} from 'react-icons/im'
import {BsVectorPen} from 'react-icons/bs'


function Home({ user }) {
  return (
    <div className="body">
      {user ? null : (
        <div className="getInLoser">
          <Button className="gimmeSpace" startIcon={<BsVectorPen/>}>
            <Link to="signup">Signup</Link>
          </Button>
          <Button startIcon={<ImEnter/>} className="gimmeSpace">
            <Link to="/login">login</Link>
          </Button>
        </div>
      )}
      {user ? (
        <Button>
          <Link to="/drafter" className="gimmeSpace">
            Draft!
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export default Home;

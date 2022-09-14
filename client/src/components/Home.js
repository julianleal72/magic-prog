import { Link } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
import { ImEnter } from "react-icons/im";
import { BsVectorPen } from "react-icons/bs";
import { TiInfo } from "react-icons/ti";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Home({ user }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="body">
      <div>
        <h3>Progression and Drafting Tool</h3>
        <Button
          onClick={() => setShowInfo(!showInfo)}
          sx={{ height: 50, width: 50, size: "large", color:"pink" }}
        >
          <TiInfo size="medium" />
        </Button>
        {showInfo ? (
          <Card sx={{ width: 500 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Context
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                Progression
              </Typography>
              <Typography sx={{ mb: 1.2 }}>[ pruh-gresh-uhn ]</Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                noun
              </Typography>
              <Typography variant="body2">
                a form of gameplay for a tcg (trading card game), where players open <br /> a pre-specified amount of booster packs from each set in chronological <br /> order, adding to their collections and creating new decks to battle <br /> against their opponents during each round 
                <br />
                <br />
                {
                  '"The Hexdrinkers should host a progression series."'
                }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=> alert("lol u got pranked, this button doesn't do anything... yet")}>Learn More</Button>
            </CardActions>
          </Card>
        ) : null}
      </div>
      {user ? null : (
        <div className="getInLoser">
          <Button className="gimmeSpace" startIcon={<BsVectorPen />}>
            <Link to="signup">Signup</Link>
          </Button>
          <Button startIcon={<ImEnter />} className="gimmeSpace">
            <Link to="/login">login</Link>
          </Button>
        </div>
      )}
      <br />
      {user ? (
        <Link to="/drafter">
          <Button variant="contained" sx={{ width: 250, height: 40, background:"pink", color:"black" }}>
            Let's Crack Some Packs!
          </Button>
        </Link>
      ) : null}
      <br />
    </div>
  );
}

export default Home;
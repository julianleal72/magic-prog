import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function SetTile({ set }) {
  const marks = [
    { value: 3, label: "Booster Draft" },
    { value: 6, label: "Sealed Pool" },
    { value: 24, label: "Masters Set Box" },
    { value: 36, label: "Booster Box" },
  ];
  const [numPacks, setNumPacks] = useState(3);
  function handleSlide(e) {
    setNumPacks(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
              {set.code}
            </Avatar>
          }
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
      </Card>
      <Box sx={{ width: 700 }}>
      <Typography id="input-slider" gutterBottom>
        Number of Packs
      </Typography>
        <Slider
          aria-label="Number of Packs"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={36}
          onChange={handleSlide}
        />
        <h5>{numPacks}</h5>
      </Box>
      <Button>
        <Link to="/packopener" state={{numPacks: {numPacks}, set: {set}}}>Draft!</Link>
      </Button>
    </div>
  );
}

export default SetTile;

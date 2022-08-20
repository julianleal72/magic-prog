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
import NewCollectionForm from "./NewCollectionForm.js"

function SetTile({ set, user }) {
  const [newCollection, setNewCollection] = useState(false)
  const marks = [
    { value: 3, label: "Booster Draft" },
    { value: 6, label: "Sealed Pool" },
    { value: 24, label: "Masters Set Box" },
    { value: 36, label: "Booster Box" },
  ];
  const [numPacks, setNumPacks] = useState(3);
  const [collection, setCollection] = useState(parseInt(user.collections[0].id))

  console.log(collection)

  function handleSlide(e) {
    setNumPacks(e.target.value);
    console.log(e.target.value);
  }

  function handleChange(e){
    setCollection(e.target.value)
    console.log(collection)
  }
  function handleNC() {
    setNewCollection(true)
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
      <div>
      {newCollection ? null : <div>
        <label>Collection to add to:</label>
      <select onChange={handleChange}>
      {user.collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.title}
          </option>
        ))}
      </select></div>}
      <br />
      {newCollection ? <NewCollectionForm user={user} drafter ={true}></NewCollectionForm> : <button onClick={handleNC}>Or, Create a New Collection</button>}
      </div>
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
        <Link to="/packopener" state={{numPacks: {numPacks}, set: {set}, collection: {collection}}}>Draft!</Link>
      </Button>
    </div>
  );
}

export default SetTile;

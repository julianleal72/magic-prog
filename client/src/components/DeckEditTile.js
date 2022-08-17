import Cardraised from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import {useState} from 'react'
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

function DeckEditTile({ card, deck, handleAddCard, handleRemoveCard }) {
  
  const [numInDeck, setNumInDeck] = useState(0)

  function handleAdd(){
    console.log(card)
    if(numInDeck < card.count && numInDeck < 4)
    {setNumInDeck(numInDeck + 1)
    handleAddCard(card)}
  }
  function handleSubtract(){
    console.log(card)
    if(numInDeck > 0)
    {setNumInDeck(numInDeck - 1)
    handleRemoveCard(card)}
  }
  
  return (
    <Cardraised
      sx={{
        margin: "auto",
        padding: "0.1em",
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          width="180"
          image={card.printing.info.imageUrl}
          alt="cardtile"
          sx={{ padding: "0em 0em 0em 0em", objectFit: "contain" }}
        />
        <Button variant="outlined" size="small" onClick ={handleAdd}
          style={{
            position: "absolute",
            top: 50,
            left: "20%",
            color: "blue",
            background: "white",
            transform: "translateX(-60%)",
          }}
        >
          {" + "}
          {card.count}x
        </Button>
        {numInDeck > 0 ?
        <Button variant="outlined" size="small" onClick ={handleSubtract}
          style={{
            position: "absolute",
            top: 50,
            left: "70%",
            color: "red",
            background: "black",
            transform: "translateX(-20%)",
          }}
        >
          {" - "}
          {numInDeck}x
        </Button>
      : null}
      </div>
    </Cardraised>
  );
}

export default DeckEditTile;

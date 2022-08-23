import Cardraised from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {useState} from 'react'
import Button from '@mui/material/Button';
import './CardHover.css'
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from "react-icons/ai"


function DeckEditTile({ card, deck, handleAddCard, handleRemoveCard, deckContents }) {
  const [numInDeck, setNumInDeck] = useState(howManyInDeck())
  //console.log(card)
  //console.log(deck)
  //console.log(deckContents)
  //console.log(numInDeck)
  function howManyInDeck(){
    let x = deckContents.find((element) => JSON.stringify(element) === JSON.stringify(card))
    if (x) return x.count
    else return 0
  }

  function handleAdd(){
    console.log(card)
    if(numInDeck < card.count && numInDeck < 4)
    {setNumInDeck(numInDeck + 1)
    handleAddCard(card, card.count)}
  }

  function handleSubtract(){
    console.log(card)
    if(numInDeck > 0)
    {setNumInDeck(numInDeck - 1)
    handleRemoveCard(card)}
  }

  return (
    <div>
    <Cardraised
      sx={{
        margin: "auto",
      }} className="hoverBaby"
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={card.printing.info.imageUrl}
          alt="cardtile"
          sx={{ padding: "0em 0em 0em 0em", objectFit: "contain" }}
        />
        <Button variant="contained" size="small" onClick ={handleAdd} startIcon={<AiOutlinePlusCircle/>}
          style={{
            position: "absolute",
            top: 75,
            left: "31%",
            transform: "translateX(-60%)"
          }}
        >
          {card.count}x
        </Button>
        {numInDeck > 0 ?
        <Button variant="outlined" startIcon={<AiOutlineMinusCircle/>} size="small" onClick ={handleSubtract}
          style={{
            position: "absolute",
            top: 75,
            left: "61%",
            color: "red",
            background: "black",
            transform: "translateX(-20%)",
          }}
        >
          {numInDeck}x
        </Button>
      : null}
      </div>
    </Cardraised>
    </div>
  );
}

export default DeckEditTile;

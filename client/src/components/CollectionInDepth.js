import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function CollectionInDepth() {
  const location = useLocation();
  const [cards, setCards] = useState(location.state.cards.cards);
  const [collection, setCollection] = useState(
    location.state.collection.collection
  );
  const [condensedCollection, setCondensedCollection] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  
  useEffect(() => {
    let yeet = condenseCards()
    console.log(yeet)
    let newSet = [...new Set(condenseCards())];
    setCondensedCollection(newSet);
    setDisplayedCards(newSet)
  }, [])

  function condenseCards() {
    let interim = [];
    cards.forEach((element) => {
      let allMatches = cards.filter(card => JSON.stringify(card.info) === JSON.stringify(element.info));
      let cardObj = {
        count: allMatches.length,
        printing: element,
      };
      interim.push(cardObj);
    });

    return interim;
  }
/////refactor
  function handleSearchByName(e){
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
  function handleSearchByText(e){
    e.preventDefault()
    let toSet = condensedCollection.filter(card => {
      if('text' in card.printing.info) {
      card.printing.info.text.toLowerCase().includes(e.target.value.toLowerCase())
      }
      else return false
    })
    setDisplayedCards(toSet)
  };
  function handleSearchByType(e){
    console.log(e.target.value)
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.type.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
  function handleSearchByManaCost(e){
    console.log(e.target.value)
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.manaCost.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
////refactor
  return (
    <div>
      <br />
      <button>
        <Link to="/decks/newC" state={{collection: {collection}}}>New Deck</Link>
      </button>
      <button>
        <Link to="/user/decks" state={{collection: {collection}}}>Decks Associated with this Collection</Link>
      </button>
      <br />
      <FormControl>
        <InputLabel
        >Search by card name</InputLabel>
        <Input name ="name" onChange={handleSearchByName}/>
      </FormControl>
      {/* <FormControl>
        <InputLabel
        >Search by color </InputLabel>
        <Input onChange={handleSearchByManaCost}/>
      </FormControl> */}
      <FormControl>
        <InputLabel
        >Search by card/creature type</InputLabel>
        <Input name = "type" onChange={handleSearchByType}/>
      </FormControl>
      {/* <FormControl>
        <InputLabel
        >Search by card text</InputLabel>
        <Input name = "text" onChange={handleSearchByText}/>
      </FormControl> */}
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {displayedCards.map((card) => (
            <CardCollectTile key={card.printing.name} card={card} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default CollectionInDepth;

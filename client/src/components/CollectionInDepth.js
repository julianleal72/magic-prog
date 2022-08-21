import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.js";

function CollectionInDepth() {
  const location = useLocation();
  const [cards, setCards] = useState(location.state.cards.cards);
  const [collection, setCollection] = useState(
    location.state.collection.collection
  );
  const [condensedCollection, setCondensedCollection] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  
  useEffect(() => {
    setCondensedCollection(condenseCards());
    setDisplayedCards(condenseCards())
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

    let unique = [];
    interim.forEach((x) => {
      if(!unique.find((y) => JSON.stringify(x.printing.info) === JSON.stringify(y.printing.info))) unique.push(x)
      })
    console.log(unique);

    return unique;
  }

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
      <SearchBar condensedCollection={condensedCollection} setDisplayedCards={setDisplayedCards} displayedCards={displayedCards}/>
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

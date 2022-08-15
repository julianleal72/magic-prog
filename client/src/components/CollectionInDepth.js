import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import ImageList from "@mui/material/ImageList";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'

function CollectionInDepth() {
  const location = useLocation();
  const [cards, setCards] = useState(location.state.cards.cards);
  const [collection, setCollection] = useState(
    location.state.collection.collection
  );
  const [condensedCollection, setCondensedCollection] = useState([]);

  useEffect(() => {
    setCondensedCollection(condenseCards());
  }, []);

  function condenseCards() {
    let interm = [];
    cards.forEach((element) => {
      let allMatches = cards.filter((card) => card.info === element.info);
      let cardObj = {
        count: allMatches.length,
        printing: element,
      };
      interm.push(cardObj);
    });
    return interm;
  }

  return (
    <div>
      <br />
      {console.log(condensedCollection)}
      {condensedCollection.map}
      <button><Link to="/decks/new">New Deck</Link></button>
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing ={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        {condensedCollection.map((card) => (
          <CardCollectTile key={card.printing.name} card={card} />
        ))}
      </Grid></Box>
    </div>
  );
}

export default CollectionInDepth;

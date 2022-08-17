import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import ImageList from "@mui/material/ImageList";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useNavigate, useLocation} from 'react-router-dom'
import DeckEditTile from './DeckEditTile.js';
import DeckHeader from "./DeckHeader.js";

function DeckEdit({user}) {
  const { state } = useLocation();
  console.log(state)
  const { collection } = state;
  const { deck } = state;
  console.log(deck)
  console.log(collection)
  const [condensedCollection, setCondensedCollection] = useState([]);

  useEffect(() => {
    console.log(collection.collection.id)
    fetch(`/collections/${collection.collection.id}`)
    .then(r=>r.json()).then(collec => {
    setCondensedCollection(condenseCards(collec.cards));
    console.log(deck)})
  }, []);

  function condenseCards(collec) {
    let interm = [];
    collec.forEach((element) => {
      let allMatches = collec.filter((card) => card.info === element.info);
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
      <br />
      <DeckHeader user ={user} meth ={'PATCH'}/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing ={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        {condensedCollection.map((card) => (
          <DeckEditTile key={card.printing.name} card={card} />
        ))}
      </Grid></Box>
    </div>
  );
}

export default DeckEdit;

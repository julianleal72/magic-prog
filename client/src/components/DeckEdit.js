import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import ImageList from "@mui/material/ImageList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import DeckEditTile from "./DeckEditTile.js";
import DeckHeader from "./DeckHeader.js";

function DeckEdit({ user }) {
  const [errors, setErrors] = useState([])
  const { state } = useLocation();
  const { deck } = state;
  const [condensedCollection, setCondensedCollection] = useState([]);

  const [showHeader, setShowHeader] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [deckContents, setDeckContents] = useState([]);

  useEffect(() => {
    console.log(state);
    console.log(deck);
    goForth();
    //console.log(condensedCollection);
  }, []);

  function goForth() {
    fetch(`/collections/${deck.collection_id}`)
      .then((r) => r.json())
      .then((collec) => {
        setCondensedCollection(condenseCards(collec.cards));
      });
  }

  function condenseCards(collec) {
    let interm = [];
    collec.forEach((element) => {
      let allMatches = collec.filter(
        (card) => JSON.stringify(card.info) === JSON.stringify(element.info)
      );
      let cardObj = {
        count: allMatches.length,
        printing: element,
      };
      interm.push(cardObj);
    });
    return interm;
  }

  function handleShowHeader() {
    setShowHeader(!showHeader);
  }
  function handleShowSearchBar() {
    setShowSearchBar(!showSearchBar);
  }


  function commitCards(){
    fetch(`/decks/${deck.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({card_id: deckContents})
    }).then((r) => {
      if (r.ok) {
        r.json().then(deck => {
          console.log(deck);
        }
    )} else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }})
  }

  function handleAddCard(toAdd) {
    if (
      deckContents.filter(
        (card) => JSON.stringify(card) === JSON.stringify(toAdd)
      ).length === 0
    ) {
      setDeckContents([...deckContents, toAdd]);
    } else {
      let index = deckContents.findIndex(
        (element) => JSON.stringify(element) === JSON.stringify(toAdd)
      );
      console.log(index)
      let tempCard = {...deckContents.find(
        (element) => JSON.stringify(element) === JSON.stringify(toAdd)
      )}
      let tempArr = [...deckContents];
      tempArr[index] = tempCard;
      //console.log(tempArr[index])
      tempArr[index]["count"] += 1;
      //console.log(tempArr[index]["count"])
      setDeckContents(tempArr);
      console.log(deckContents)
    }
  }

  function handleRemoveCard(toRemove) {
    let index = deckContents.findIndex(
      (element) => JSON.stringify(element) === JSON.stringify(toRemove)
    );
    let tempCard = {...deckContents.find(
      (element) => JSON.stringify(element) === JSON.stringify(toRemove)
    )}
    let tempArr = [...deckContents];
    tempArr[index] = tempCard;
    tempArr[index]["count"] -= 1;
    setDeckContents(tempArr);
  }

  return (
    <div>
      <br />
      <br />
      <div>
        <button onClick={handleShowHeader}>
          {showHeader ? "Close Deck Details" : "Edit Deck Details" }
        </button>
        <button onClick={handleShowSearchBar}>
          {showSearchBar ? " Close Search" : "Search" }
        </button>
      </div>
      {showHeader ? <DeckHeader user={user} meth={"PATCH"} deck={deck} /> : null}
      <br />
      <br />
      {showSearchBar ? "ABSTRACT OUT SEARCH BAR HERE" : null}
      <br />
      <br />
      {errors?errors.map(e => <div key={e[0]}>{e[1]}</div>):null}
      <button onClick = {commitCards}>Save Deck</button>
      {/*display cards here */}
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {condensedCollection.map((card) => (
            <DeckEditTile
              key={card.printing.name}
              card={card}
              deck={deck}
              handleAddCard={handleAddCard}
              handleRemoveCard={handleRemoveCard}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default DeckEdit;

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import DeckEditTile from "./DeckEditTile.js";
import DeckHeader from "./DeckHeader.js";
import SearchBar from "./SearchBar.js";

function DeckEdit({ user }) {
  const [errors, setErrors] = useState([]);
  const { state } = useLocation();
  const deck = state.deck.deck;
  const [condensedCollection, setCondensedCollection] = useState([]);
  console.log(deck);
  console.log(state);
  const [showHeader, setShowHeader] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [deckContents, setDeckContents] = useState(deck.cards.array);
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    // console.log(state);
    // console.log(deck);
    // console.log(deckContents)
    goForth();
  }, []);

  function goForth() {
    fetch(`/collections/${deck.collection_id}`)
      .then((r) => r.json())
      .then((collec) => {
        setCondensedCollection(condenseCards(collec.cards));
        setDisplayedCards(condenseCards(collec.cards));
      });
  }

  function condenseCards(collec) {
    let interim = [];
    collec.forEach((element) => {
      let allMatches = collec.filter(
        (card) => JSON.stringify(card.info) === JSON.stringify(element.info)
      );
      let cardObj = {
        count: allMatches.length,
        printing: element,
      };
      interim.push(cardObj);
    });

    let unique = [];
    interim.forEach((x) => {
      if (
        !unique.find(
          (y) =>
            JSON.stringify(x.printing.info) === JSON.stringify(y.printing.info)
        )
      )
        unique.push(x);
    });
    console.log(unique);

    return unique;
  }

  function handleShowHeader() {
    setShowHeader(!showHeader);
  }
  function handleShowSearchBar() {
    setShowSearchBar(!showSearchBar);
  }

  function handleShit() {
    let temp = [...deckContents];
    temp.forEach((c, index) => {
      if (c.count === 0) {
        console.log("cutting shit");
        console.log(c);
        temp.splice(index, 1);
        console.log(temp);
      }
      if (c.count > 4) {
        temp[index]["count"] = 4;
      }
    });
    return temp;
  }

  function commitCards() {
    let thisIsAnnoying = {
      array: handleShit(),
    };
    console.log(thisIsAnnoying);
    fetch(`/decks/${deck.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cards: thisIsAnnoying }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((deck) => {
          console.log(deck);
          alert("Deck Saved, Kiddo");
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleAddCard(toAdd, count) {
    if (
      deckContents.filter(
        (card) => JSON.stringify(card) === JSON.stringify(toAdd)
      ).length === 0
    ) {
      setDeckContents([...deckContents, toAdd]);
      console.log(deckContents);
    } else {
      let index = deckContents.findIndex(
        (element) => JSON.stringify(element) === JSON.stringify(toAdd)
      );
      console.log(index);
      let tempCard = {
        ...deckContents.find(
          (element) => JSON.stringify(element) === JSON.stringify(toAdd)
        ),
      };
      let tempArr = [...deckContents];
      tempArr[index] = tempCard;
      //console.log(tempArr[index])
      tempArr[index]["count"] += 1;
      if (tempArr[index]["count"] > 4 || tempArr[index]["count"] > count) {
        tempArr[index]["count"] = 4 > count ? count : 4;
      }
      //console.log(tempArr[index]["count"])
      setDeckContents(tempArr);
      console.log(deckContents);
    }
  }

  function handleRemoveCard(toRemove) {
    let index = deckContents.findIndex(
      (element) => JSON.stringify(element) === JSON.stringify(toRemove)
    );
    let tempCard = {
      ...deckContents.find(
        (element) => JSON.stringify(element) === JSON.stringify(toRemove)
      ),
    };
    let tempArr = [...deckContents];
    tempArr[index] = tempCard;
    tempArr[index]["count"] -= 1;
    if (tempArr[index]["count"] === 0) {
      //console.log("here we are")
      tempArr.splice(index, 1);
    }
    console.log(tempArr);
    setDeckContents(tempArr);
    console.log(deckContents);
  }

  return (
    <div>
      <br />
      <h2>{deck.name}</h2>
      <br />
      <div>
        <button onClick={handleShowHeader}>
          {showHeader ? "Close Deck Details" : "Edit Deck Details"}
        </button>
        <button onClick={handleShowSearchBar}>
          {showSearchBar ? " Close Search" : "Search"}
        </button>
      </div>
      {showHeader ? (
        <DeckHeader user={user} deck={deck} setShowHeader={setShowHeader} />
      ) : null}
      <br />
      <br />
      {deckContents.map((content) => (
        <h5>
          {content.count} - {content.printing.info.name}
        </h5>
      ))}
      {showSearchBar ? (
        <SearchBar
          condensedCollection={condensedCollection}
          setDisplayedCards={setDisplayedCards}
          displayedCards={displayedCards}
        />
      ) : null}
      <br />
      <br />
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <button onClick={commitCards}>Save Deck</button>
      <br />
      <br />
      <Box>
        <Grid>
          {condensedCollection.map((card) => (
            <DeckEditTile
              key={card.printing.name}
              card={card}
              deck={deck}
              deckContents={deckContents}
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

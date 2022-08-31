import { useEffect, useState } from "react";
import { Button, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import DeckEditTile from "./DeckEditTile.js";
import DeckHeader from "./DeckHeader.js";
import SearchBar from "./SearchBar.js";
import { FiEdit3 } from "react-icons/fi";
import "./DeckEdit.css";
import {
  GiPerspectiveDiceSixFacesSix,
  GiArchiveResearch,
  GiWhiteBook
} from "react-icons/gi";

function DeckEdit({ user }) {
  const [errors, setErrors] = useState([]);
  const { state } = useLocation();
  const [deck, setDeck] = useState(state.deck.deck);
  const [condensedCollection, setCondensedCollection] = useState([]);
  const [savedDeck, setSavedDeck] = useState(false);
  //console.log(deck);
  //console.log(state);
  const [showHeader, setShowHeader] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [deckContents, setDeckContents] = useState(deck.cards.array);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [display, setDisplay] = useState(null)

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
    //console.log(unique);
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
        //console.log("cutting shit");
        //console.log(c);
        temp.splice(index, 1);
        //console.log(temp);
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
    //console.log(thisIsAnnoying);
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
          setSavedDeck(true)
          setTimeout(() => {
            setSavedDeck(false)
          }, 5000);
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
      
    });
  }

  function handleAddCard(toAdd, count) {
    if (
      deckContents.filter(
        (card) =>
          JSON.stringify(card.printing) === JSON.stringify(toAdd.printing)
      ).length === 0
    ) {
      let bandAid = { ...toAdd };
      bandAid["count"] = 1;
      //console.log(bandAid)
      setDeckContents([...deckContents, bandAid]);
      //console.log(deckContents);
    } else {
      let index = deckContents.findIndex(
        (element) =>
          JSON.stringify(element.printing) === JSON.stringify(toAdd.printing)
      );
      //console.log(index);
      let tempCard = {
        ...deckContents.find(
          (element) =>
            JSON.stringify(element.printing) === JSON.stringify(toAdd.printing)
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
      //console.log(deckContents);
    }
  }

  function handleRemoveCard(toRemove) {
    let index = deckContents.findIndex(
      (element) =>
        JSON.stringify(element.printing) === JSON.stringify(toRemove.printing)
    );
    let tempCard = {
      ...deckContents.find(
        (element) =>
          JSON.stringify(element.printing) === JSON.stringify(toRemove.printing)
      ),
    };
    let tempArr = [...deckContents];
    tempArr[index] = tempCard;
    tempArr[index]["count"] -= 1;
    if (tempArr[index]["count"] === 0) {
      //console.log("here we are")
      tempArr.splice(index, 1);
    }
    //console.log(tempArr);
    setDeckContents(tempArr);
    //console.log(deckContents);
  }

  return (
    <div>
      <br />
      {savedDeck ? <Alert severity="success">Deck Has Been Saved, Yo. Very Cool</Alert> : null}
      <h2>{deck.name}</h2>
      <Button
        startIcon={showSearchBar ? <GiWhiteBook/> : <GiArchiveResearch />}
        variant="contained"
        sx={{ background: "purple" }}
        onClick={handleShowSearchBar}
      >
        {showSearchBar ? " Close Search" : "Search"}
      </Button>
      {showSearchBar ? (
        <SearchBar
          condensedCollection={condensedCollection}
          setDisplayedCards={setDisplayedCards}
          displayedCards={displayedCards}
        />
      ) : null}
      <br />
      <div className="wrapper">
        <div className="leftSide">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FiEdit3 />}
            onClick={handleShowHeader}
          >
            {showHeader ? "Close Deck Details" : "Edit Deck Details"}
          </Button>
          {showHeader ? (
            <DeckHeader
              user={user}
              deck={deck}
              setDeck={setDeck}
              setShowHeader={setShowHeader}
            />
          ) : null}
          <div></div>
          {showHeader ? null : (
            <div>
              <div className="deckList">
              {deckContents.map((content) => (
                // <div onmouseover={setDisplay(content.printing.info.imageUrl)} onmouseout={setDisplay(null)}>
                  <p>{content.count} - {content.printing.info.name}</p>
                // </div>
              ))}
              </div>
              {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
              {/* {display? <img src={display}/> : null} */}
              <Button
                onClick={commitCards}
                variant="contained"
                sx={{ background: "purple" }}
                startIcon={<GiPerspectiveDiceSixFacesSix />}
              >
                Save Deck
              </Button>
            </div>
          )}
        </div>
        <div className="rightSide">
          {displayedCards.map((card) => (
            <DeckEditTile
              key={card.printing.name}
              card={card}
              deck={deck}
              deckContents={deckContents}
              handleAddCard={handleAddCard}
              handleRemoveCard={handleRemoveCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeckEdit;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardCollectTile from "./CardCollectTile.js";
import { Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import { FcPlus } from "react-icons/fc";
import CollectionHeader from "./CollectionHeader.js";
import { FiEdit3 } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";
import './CollectionInDepth.css'

function CollectionInDepth() {
  const location = useLocation();
  const [cards, setCards] = useState(location.state.cards.cards);
  const [collection, setCollection] = useState(
    location.state.collection.collection
  );
  const [condensedCollection, setCondensedCollection] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setCondensedCollection(condenseCards());
    setDisplayedCards(condenseCards());
  }, []);

  function condenseCards() {
    let interim = [];
    cards.forEach((element) => {
      let allMatches = cards.filter(
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

  return (
    <div>
      <div className="buttonDiv">
        <div className="deckButtonDiv">
          <Button variant="outlined" color="success" startIcon={<FcPlus />}>
            <Link to="/decks/newC" state={{ collection: { collection } }}>
              New Deck
            </Link>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<GiSpellBook />}
          >
            <Link to="/user/decks" state={{ collection: { collection } }}>
              Decks
            </Link>
          </Button>
        </div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FiEdit3 />}
          onClick={handleShowHeader}
        >
          {showHeader ? "Close Collection Details" : "Edit Collection Details"}
        </Button>
        {showHeader ? (
          <CollectionHeader
            collection={collection}
            setShowHeader={setShowHeader}
            setCollection={setCollection}
          />
        ) : null}
      </div>

      <SearchBar
        condensedCollection={condensedCollection}
        setDisplayedCards={setDisplayedCards}
        displayedCards={displayedCards}
      />
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

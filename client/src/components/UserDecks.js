import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Deck from "./Deck.js";
import { useNavigate, useLocation } from "react-router-dom";

function UserDecks({ user }) {
  const [decks, setDecks] = useState([]);
  const location = useLocation();
  const [collection, setCollection] = useState({}
  );
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (location.state) {
      collectionDecks();
    } else goGetEm();
  }, [reload]);

  function goGetEm() {
    console.log("fetching")
    fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then((r) => {
        setDecks(r.decks);
        console.log(r);
      })
  }

  function handleReload(){
    console.log("triggered")
    setReload(!reload)
  }

  function collectionDecks() {
    fetch(`/collections/${location.state.collection.collection.id}`)
      .then((r) => r.json())
      .then((r) => {
        setDecks(r.decks);
        console.log(r);
      });
  }

  return (
    <div>
      {/* <button>
        <Link to="/decks/new" state={{ collection: { collection } }}>
          New Deck
        </Link>
      </button> */}
      {decks.length > 0 ? (
        <div>
          {decks.map((deck) => (
            <Deck deck={deck} user={user} reload={handleReload} collection={collection}/>
          ))}
        </div>
      ) : (
        "You have no decks! Try creating one."
      )}
    </div>
  );
}

export default UserDecks;

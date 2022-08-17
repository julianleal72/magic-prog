import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Deck from "./Deck.js";
import { useNavigate, useLocation } from "react-router-dom";

function UserDecks({ user }) {
  const [decks, setDecks] = useState([]);
  const location = useLocation();
  const [collection, setCollection] = useState({}
  );

  useEffect(() => {
    if (location.state) {
      collectionDecks();
    } else goGetEm();
  }, [user.id]);

  function goGetEm() {
    fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then((r) => {
        setDecks(r.decks);
        console.log(r);
      });
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
      <button>
        <Link to="/decks/new" state={{ collection: { collection } }}>
          New Deck
        </Link>
      </button>
      {decks.length > 0 ? (
        <div>
          {decks.map((deck) => (
            <Deck deck={deck} user={user} />
          ))}
        </div>
      ) : (
        "You have no decks! Try creating one."
      )}
    </div>
  );
}

export default UserDecks;

import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import Deck from './Deck.js'

function UserDecks({user}){
    const [decks, setDecks] = useState([]);

    useEffect(() => {
      async function goGetEm(){
        await fetch(`/users/${user.id}`)
        .then((r) => r.json())
        .then((r) => {
          setDecks(r.decks);
          console.log(r);
        })}
        goGetEm();
    }, [user.id]);

    return(
        <div>
            {decks.length > 0 ? 
            <div>
            {user.decks.map((deck) => <Deck deck={deck} user={user}/>
            )}
            </div>
            : "You have no decks! Try creating one."}
        </div>
    )
}

export default UserDecks
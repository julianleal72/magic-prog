import {useNavigate} from 'react-router-dom'

function Deck({deck, user, collection, reload}){
    
    const navigate = useNavigate()

    function deckSize(){
        //might need this in edit form as well
    }

    function handleEdit(){
        navigate("/decks/edit/:id", {
            state: { deck: {deck} },
          })
    }

    function handleDelete(){
        fetch(`/decks/${deck.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(r=>r.json()).then(r => {
            console.log(r)
            reload()
        })
    }
    
    return(
        <div>
         {deck.name}
         <br />
         {deck.format}
         <br />
         {deck.description}
         <br />
         {collection.title}
        {/* link to collection ? */}
         <button onClick={handleEdit}>Edit Deck</button>
         <button onClick={handleDelete}>Delete Deck</button>
         <br />
        </div>
    )

}

export default Deck

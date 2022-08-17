import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DeckHeader({ user, meth, deck }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state.collection

  useEffect(() => {
    //console.log(location.state.collection.id);
    let starterFormData = {
      collection_id: meth === "POST" ? user.collections[0].id: location.state.collection.id ,
      name: "",
      format: meth === "POST" ? "Freeform" : "",
      description: "",
    };
    console.log(deck)
    console.log(starterFormData)
    if (meth==="PATCH") starterFormData = deck
    console.log(starterFormData)
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let url = (meth==="POST" ? "/decks" : `/decks/${deck.id}`)
    fetch(url, {
      method: `${meth}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((deck) => {
          console.log(deck);
          navigate("/decks/edit/:id", {
            state: { deck: formData },
          });
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleChange(e) {
    let { value, name } = e.target;
    if (name ==="collection_id") {
      value = parseInt(value)
    }
    setFormData({ ...formData, [name]: value });
    // console.log(value)
    // console.log(formData)
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <form onSubmit={handleSubmit}>
        <label>Deck Name:</label>
        <input
          type="text"
          name="name"
          placeholder={"Deck Name..."}
          value={formData.name}
          onChange={handleChange}
        />
        <label>Format:</label>
        <select type="text" value = {formData.format} name="format" onChange={handleChange}>
          <option value="Freeform">Freeform</option>
          <option value="Eternal">Eternal</option>
          <option value="Progression">Progression</option>
        </select>
        <label>Description:</label>
        <textarea name="description" value={formData.description}onChange={handleChange} />
        {meth==="POST" ? <div>
        <label>Collection to add to:</label>
        <select onChange={handleChange} name="collection_id">
          {user.collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select></div>
        : null}
        {meth=== "POST" ? <button>Create Deck!</button> : <button>Update Deck Details</button>}
      </form>
    </div>
  );
}

export default DeckHeader;

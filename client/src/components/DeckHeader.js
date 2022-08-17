import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DeckHeader({ user, meth }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state.collection.id);
    let starterFormData = {
      collection_id: meth === "POST" ? user.collections[0].id: location.state.collection.id ,
      name: "",
      format: meth === "POST" ? "Freeform" : "",
      description: "",
    };
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/decks", {
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
            state: { deck: formData, collection: location.state.collection },
          });
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(value)
    console.log(formData)
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
          onChange={handleChange}
        />
        <label>Format:</label>
        <select type="text" name="format" onChange={handleChange}>
          <option value="Freeform">Freeform</option>
          <option value="Eternal">Eternal</option>
          <option value="Progression">Progression</option>
        </select>
        <label>Description:</label>
        <textarea name="description" onChange={handleChange} />
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
        {meth=== "POST" ? <button>Create Deck!</button> : <button>Update Deck</button>}
      </form>
    </div>
  );
}

export default DeckHeader;

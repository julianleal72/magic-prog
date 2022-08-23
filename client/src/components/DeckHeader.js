import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DeckHeader({ user, setShowHeader}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const deck = location.state.deck.deck
  console.log(deck)
  const navigate = useNavigate();


  useEffect(() => {
    let starterFormData = deck
    console.log(starterFormData)
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/decks/${deck.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((deck) => {
          console.log(deck);
          setShowHeader(false)
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
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <form onSubmit={handleSubmit}>
        <label>Deck Icon:</label>
        <input
          type="text"
          name="icon"
          placeholder={"Deck Icon..."}
          value={formData.icon}
          onChange={handleChange}
        />
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
        <button>Update Deck Details</button>
      </form>
    </div>
  );
}

export default DeckHeader;

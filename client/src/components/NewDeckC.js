import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NewDeckC({ user }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state.collection

  useEffect(() => {
    let starterFormData = {
      collection_id: location.state.collection.collection.id,
      name: "",
      format: "Freeform",
      description: "",
      cards: {"array": []}
    };
    console.log(starterFormData)
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          console.log(d);
          navigate("/user/decks");
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
        {/* <div>
        <label>Collection to add to:</label>
        <select onChange={handleChange} name="collection_id">
          {user.collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select></div> */}
        <button>Create Deck!</button>
      </form>
    </div>
  );
}

export default NewDeckC;
